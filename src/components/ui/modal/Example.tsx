import { DialogTrigger, Heading } from 'react-aria-components';
import { Modal } from './Modal';
import { Dialog } from '../dialog/Dialog';
import Button from '../button/Buton';
import { useState } from 'react';

export function Example(props: any) {

  let [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => {
        setOpen(true)
      }}>Menu</Button>

      <Modal 
        isDismissable 
        isOpen={isOpen} 
        handleClose={() => setOpen(false)}
        onOpenChange={(open) => setOpen(open)}
        width={{ xs: '95%', sm: '80%', md: '50%', default: '450px' }}
        title="Thông báo hệ thống"
        // footer={null}
      >
          <div className="">

          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          <p>Click outside or press Escape to close this dialog sâssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
          </div>
      </Modal>
    </>
  );
}
