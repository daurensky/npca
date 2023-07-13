export type WithTimestamps<T> = T & {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiMultipleWrapper<Attributes> = {
  data: {
    id: number;
    attributes: WithTimestamps<Attributes>;
  }[];
};

export type StrapiSingleWrapper<Attributes> = {
  data: {
    id: number;
    attributes: WithTimestamps<Attributes>;
  };
};

export type NullableStrapiSingleWrapper<Attributes> = {
  data: null | {
    id: number;
    attributes: WithTimestamps<Attributes>;
  };
};
