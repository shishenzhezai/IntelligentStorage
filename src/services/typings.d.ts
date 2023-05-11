declare namespace Utils {
  type FieldData = {
    name: string | number;
    value?: any;
    displayType?: string;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
  };
}
