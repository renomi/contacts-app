export type IndicatorProps = {
  text?: string;
  description?: string;
};

export type ErrorIndicatorProps = IndicatorProps & {
  btnLabel?: string;
  onRefetch?: () => void;
};
