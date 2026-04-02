#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REGISTRY_LOCAL = './registry.json';
const REGISTRY_REMOTE = 'https://raw.githubusercontent.com/huy14032003/ui-component/main/registry.json';

const log = (msg: string) => console.log(`[BASE-CUS-UI] ${msg}`);
const error = (msg: string) => console.error(`[BASE-CUS-UI] ERROR: ${msg}`);

const getTargetProjectDir = () => process.cwd();

/**
 * Fetch registry from local file or remote URL
 */
const getRegistry = async (isLocal: boolean) => {
    if (isLocal && fs.existsSync(REGISTRY_LOCAL)) {
        log('Sử dụng Registry nội bộ...');
        return JSON.parse(fs.readFileSync(REGISTRY_LOCAL, 'utf-8'));
    }

    log('Đang tải Registry từ máy chủ từ xa...');
    try {
        const response = await fetch(REGISTRY_REMOTE);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (err: any) {
        if (isLocal) {
            error(`Không tìm thấy registry.json nội bộ và không thể tải từ xa: ${err.message}`);
        } else {
            error(`Không thể tải Registry từ GitHub: ${err.message}. Hãy kiểm tra kết nối mạng.`);
        }
        process.exit(1);
    }
};

const installNpmPackages = (packages: string[], cwd: string) => {
  if (packages.length === 0) return;
  
  const pkgJsonPath = path.join(cwd, 'package.json');
  let toInstall = packages;
  
  if (fs.existsSync(pkgJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      toInstall = packages.filter(p => !allDeps[p]);
  }

  if (toInstall.length === 0) return;

  log(`Đang cài đặt các gói npm: ${toInstall.join(', ')}...`);
  try {
    execSync(`npm install ${toInstall.join(' ')} --save`, { stdio: 'inherit', cwd });
  } catch (err) {
    error('Lỗi khi cài đặt các gói npm.');
  }
};

const ensureCore = (registry: any, cwd: string) => {
    const core = registry.core;
    if (!core) return;

    installNpmPackages(core.dependencies, cwd);
    
    core.files.forEach((file: any) => {
        const targetPath = path.join(cwd, file.path);
        const targetDir = path.dirname(targetPath);
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        if (!fs.existsSync(targetPath)) {
            fs.writeFileSync(targetPath, file.content);
            log(`Đã khởi tạo file hệ thống: ${file.path}`);
        }
    });
};

const addComponent = (name: string, registry: any, cwd: string, added: Set<string> = new Set()) => {
  if (added.has(name)) return;
  added.add(name);

  const component = registry.components[name];
  if (!component) {
    error(`Component "${name}" không tồn tại trong danh sách.`);
    return;
  }

  log(`Đang thêm component: ${name}...`);

  ensureCore(registry, cwd);
  installNpmPackages(component.dependencies, cwd);

  if (component.internalDependencies) {
    component.internalDependencies.forEach((dep: string) => {
        if (registry.components[dep]) {
            addComponent(dep, registry, cwd, added);
        }
    });
  }

  component.files.forEach((file: any) => {
    const targetPath = path.join(cwd, file.path);
    const targetDir = path.dirname(targetPath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (fs.existsSync(targetPath)) {
      // log(`File ${file.path} đã tồn tại. Bỏ qua.`);
      return;
    }

    fs.writeFileSync(targetPath, file.content);
    log(`Đã tạo: ${file.path}`);
  });
};

const main = async () => {
  const args = process.argv.slice(2);
  const isLocal = args.includes('--local');
  const command = args.find(a => !a.startsWith('--'));
  const componentNames = args.filter(a => a !== command && !a.startsWith('--'));

  const cwd = getTargetProjectDir();
  const registry = await getRegistry(isLocal);

  if (command === 'add') {
    if (componentNames.length === 0) {
      error('Sử dụng: npx base-cus-ui add <tên-component>');
      return;
    }
    
    for (const name of componentNames) {
        addComponent(name, registry, cwd);
    }
    log('Tất cả component đã được thêm thành công!');
  } else if (command === 'list') {
    log('Danh sách component có sẵn:');
    Object.keys(registry.components).forEach(k => console.log(` - ${k}`));
  } else if (command === 'init') {
    ensureCore(registry, cwd);
    log('Khởi tạo hoàn tất.');
  } else if (command === 'tailwind') {
      // ... logic hiển thị tailwind như cũ ...
      console.log('\n--- SAO CHÉP VÀO tailwind.config.ts / tailwind.config.js ---\n');
      console.log('// Xem trong README_CLI.md để biết chi tiết cấu hình');
  } else {
    log('Chào mừng đến với BASE-CUS-UI. Các lệnh hỗ trợ: init, add, list, tailwind.');
  }
};

main();
