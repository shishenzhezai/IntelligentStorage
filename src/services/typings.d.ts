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

declare namespace Storage {
  type ModalProps = {
    title: string;
    isModalOpen: boolean;
  };

  type requestItem = {
    Page: number;
    Rows: number;
    Total?: number;
    TableName?: string;
    Sort?: string;
    Order?: string;
    Wheres?: string;
    Export?: boolean;
  };

  type PageData = {
    extra?: any;
    status?: number;
    msg?: string;
    total?: number;
    rows?: [];
    summary?: any;
  };
}
