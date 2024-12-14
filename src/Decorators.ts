/**
 * A decorator function that sets the configurable attribute of a property descriptor.
 *
 * @param value - A boolean value indicating whether the property should be configurable.
 * @returns A decorator function that sets the configurable attribute of the property descriptor.
 */
function configurable(value: boolean) {
    return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.configurable = value;
    };
}

/**
 * A decorator function that sets the enumerable attribute of a class property.
 *
 * @param value - A boolean indicating whether the property should be enumerable.
 * @returns A decorator function that sets the `enumerable` property of the property's descriptor.
 */
function enumerable(value: boolean) {
    return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.enumerable = value;
    };
}

export {
    enumerable,
    configurable
}