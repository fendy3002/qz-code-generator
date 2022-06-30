export interface Context {
  path: {
    helper: string;
    template: string;
    output: string;
    extension: string;
  };
  schemaOption: {
    prettier?: {
      tabWidth: number;
    };
    excludePrettier: string[];
  };
  schema: any;
  [key: string]: any;
}
