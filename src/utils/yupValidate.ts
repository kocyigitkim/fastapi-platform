import * as yup from 'yup';

export function yupValidate(schema: any, data: any) {
    try {
        var res = (schema as yup.AnySchema).validateSync(data, { abortEarly: false }) as yup.ValidationError;
        if (res && res.errors) {
            return {
                success: false,
                ...res
            };
        }
        else {
            return {
                success: true
            }
        }
    } catch (err) {
        return {
            success: false,
            ...err
        }
    }
}