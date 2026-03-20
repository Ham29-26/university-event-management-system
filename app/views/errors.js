import { escape } from "@std/html/entities";

export function fragments(errors) {
    return Object.fromEntries(Object.keys(errors).map(key => {
        const {error, value, message} = errors[key] || {};

        // need to verify the given value is not type of File then only use the escape function
        const safeValue = typeof value == "string" ? escape(value) : "";

        return [key, {
            value: value ? `value="${safeValue}"` : "",
            text: value ? `${safeValue}` : "",  // will be used in text areas where there is no "value" attribute
            message: error ? `<p class="error">${escape(message)}</p>` : ""
        }];
    }))
}