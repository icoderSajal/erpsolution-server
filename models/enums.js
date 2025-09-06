// Shared enums and validators used by the models.

export const ROLE = Object.freeze({
    USER: 0,
    ADMIN: 1,
    HRADMIN: 2,
    MANAGER: 3,
    SUPERVISOR: 4,
    SUBADMIN: 5
});

export const ACTIVE = Object.freeze({
    ACTIVE: 1,
    INACTIVE: 0,
});

export const ACTION = Object.freeze({
    CREATE: 0,
    READ: 1,
    EDIT: 2,
    DELETE: 3,
});

export const ACTION_VALUES = [ACTION.CREATE, ACTION.READ, ACTION.EDIT, ACTION.DELETE];

export function isValidActionArray(arr) {
    return Array.isArray(arr) && arr.every(v => ACTION_VALUES.includes(v));
}
