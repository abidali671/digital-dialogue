import { IContentDocument } from "./ContentType";

export type JSONValue = {
  [key: string]: JSONValue | JSONValue[] | string | boolean | number;
};

export interface ISysData {
  space: {
    sys: {
      type: "Link";
      linkType: "Space";
      id: string;
    };
  };
  id: string;
  type: string;
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
}

export interface ITagData {
  sys: ISysData;
  fields: {
    label: string;
    slug: string;
    category: ICategoryData;
  };
}

export interface ICategoryData {
  sys: ISysData;
  fields: {
    label: string;
    slug: string;
  };
}

export interface ICoverImageData {
  sys: ISysData;
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface IAuthorData {
  sys: ISysData;
  fields: {
    name: string;
    picture: {
      sys: ISysData;
      fields: {
        title: string;
        description: string;
        file: {
          url: string;
          details: {
            size: number;
            image: {
              width: number;
              height: number;
            };
          };
          fileName: string;
          contentType: string;
        };
      };
    };
  };
}

export interface IPostData {
  sys: ISysData;
  fields: {
    author: IAuthorData;
    category: ICategoryData;
    tags: ITagData[];
    coverImage: ICoverImageData;
    content: IContentDocument;
    slug: string;
    exerpt: string;
    title: string;
  };
}
