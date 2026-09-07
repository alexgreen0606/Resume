export const readCustomTextToArray = async (importFunc: () => Promise<unknown>) => {
    const thisTechStackModule = await importFunc() as { default: string }
    const text = await fetch(thisTechStackModule.default).then(response => response.text());
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    return lines
}

export const getTextUrl = async (source: () => Promise<unknown>) => {
    const module = await source() as { default?: string } | string;
    return typeof module === 'string' ? module : module.default;
}