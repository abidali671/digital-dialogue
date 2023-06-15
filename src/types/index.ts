export type JSONValue = {
  [key: string]: JSONValue | JSONValue[] | string | boolean | number;
};

export interface ITagData {
  sys: {
    space: {
      sys: {
        type: "Link";
        linkType: "Space";
        id: string;
      };
    };
    id: string;
    type: "Entry";
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: "Link";
        linkType: "Environment";
      };
    };
    revision: number;
    contentType: {
      sys: {
        type: "Link";
        linkType: "ContentType";
        id: string;
      };
    };
    locale: string;
  };
  fields: {
    label: string;
    slug: string;
    category: ICategoryData;
  };
}

export interface ICategoryData {
  sys: {
    space: {
      sys: {
        type: "Link";
        linkType: "Space";
        id: string;
      };
    };
    id: string;
    type: "Entry";
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: "Link";
        linkType: "Environment";
      };
    };
    revision: number;
    contentType: {
      sys: {
        type: "Link";
        linkType: "ContentType";
        id: string;
      };
    };
    locale: string;
  };
  fields: {
    label: string;
    slug: string;
  };
}
