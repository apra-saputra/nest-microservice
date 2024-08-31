import { Response, ResponseResultType } from 'src/utils/response';

// Fungsi template yang bisa digunakan untuk format pesan dinamis
function formatMessage(template: string, args: any[]): string {
  return template.replace(/\$\{(\d+)\}/g, (match, index) => args[index] || match);
}

export function FormatResponse(messageTemplate: string, constant: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): ResponseResultType {
      // Generate dynamic message using the messageTemplate
      const message = formatMessage(messageTemplate, args);

      // Call the original method with its arguments
      const data = originalMethod.apply(this, args);

      // Return the formatted response
      return Response.instance.buildResponse({
        message,
        constant,
        data,
      });
    };

    return descriptor;
  };
}