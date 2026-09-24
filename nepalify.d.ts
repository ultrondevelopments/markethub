declare module 'nepalify' {
    export function format(text: string, options?: { layout: string }): string;
    export function availableLayouts(): string[];
    export function interceptElementById(id: string, options?: { layout?: string, enable?: boolean }): any;
}
