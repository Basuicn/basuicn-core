export const GENERAL_PREFIX = "/general";
export const FORM_PREFIX = "/form";
export const COMPLEX_PREFIX = "/complex";
export const OVERLAYS_PREFIX = "/overlays";
export const DEMO_PREFIX = "/demo";

export const ROUTES_CONSTANT = {
    DASHBOARD: "/",
    GENERAL: {
        BUTTON: "/button",
        ALERT: "/alert",
        BADGE: "/badge",
        AVATAR: "/avatar",
        SKELETON: "/skeleton",
        SPINNER: "/spinner",
        SEPARATOR: "/separator",
        BREADCRUMB: "/breadcrumb",
        ASPECT_RATIO: "/aspect-ratio",
        CALENDAR: "/calendar",
        RATE: "/rate",
        TOGGLE: "/toggle",
        PREVIEW_CARD: "/preview-card",
        CAROUSEL: "/carousel",
        TYPOGRAPHY: "/typography",
        EMPTY: "/empty",
        TIMELINE: "/timeline",
    },
    FORM: {
        INPUT: "/input",
        TEXTAREA: "/textarea",
        SELECT: "/select",
        DATEPICKER: "/datepicker",
        CHECKBOX: "/checkbox",
        RADIO: "/radio",
        COMBOBOX: "/combobox",
        AUTOCOMPLETE: "/autocomplete",
        SWITCH: "/switch",
        SLIDER: "/slider",
        INPUT_OTP: "/input-otp",
        NUMBER_INPUT: "/number-input",
        FILE_UPLOAD: "/file-upload",
    },
    COMPLEX: {
        PAGINATION: `${COMPLEX_PREFIX}/pagination`,
        SCROLL_AREA: `${COMPLEX_PREFIX}/scroll-area`,
        TABLE: `${COMPLEX_PREFIX}/table`,
        TABS: `${COMPLEX_PREFIX}/tabs`,
        ACCORDION: `${COMPLEX_PREFIX}/accordion`,
        COLLAPSIBLE: `${COMPLEX_PREFIX}/collapsible`,
        SIDEBAR: `${COMPLEX_PREFIX}/sidebar`,
        CODE_SANDBOX: `${COMPLEX_PREFIX}/code-sandbox`,
        RESIZABLE: `${COMPLEX_PREFIX}/resizable`,
        TABLE_CONTENTS: `${COMPLEX_PREFIX}/table-contents`,
        COMMAND: `${COMPLEX_PREFIX}/command`,
        TREE_VIEW: `${COMPLEX_PREFIX}/tree-view`,
    },
    OVERLAYS: {
        DIALOG: `${OVERLAYS_PREFIX}/dialog`,
        ALERT_DIALOG: `${OVERLAYS_PREFIX}/alert-dialog`,
        POPOVER: `${OVERLAYS_PREFIX}/popover`,
        TOOLTIP: `${OVERLAYS_PREFIX}/tooltip`,
        DRAWER: `${OVERLAYS_PREFIX}/drawer`,
        DROPDOWN_MENU: `${OVERLAYS_PREFIX}/dropdown-menu`,
        CONTEXT_MENU: `${OVERLAYS_PREFIX}/context-menu`,
        SHEET: `${OVERLAYS_PREFIX}/sheet`,
        PROGRESS: `${OVERLAYS_PREFIX}/progress`,
        MENU_BAR: `${OVERLAYS_PREFIX}/menu-bar`,
    },
    DEMO: {
        LOGIN: `${DEMO_PREFIX}/login`,
        DASHBOARD: `${DEMO_PREFIX}/dashboard`,
    }



} as const