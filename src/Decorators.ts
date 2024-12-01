function configurable(value: boolean) {
    return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.configurable = value;
    };
}

function enumerable(value: boolean) {
    return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.enumerable = value;
    };
}

export {
    enumerable,
    configurable
}