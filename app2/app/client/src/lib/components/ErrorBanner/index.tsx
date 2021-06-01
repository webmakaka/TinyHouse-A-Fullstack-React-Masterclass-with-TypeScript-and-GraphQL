import { Alert } from 'antd';

interface IProps {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = 'Uh oh! Something went wrong!',
  description = 'Look like somethig went wrong! Please check your connection and/or try again later!',
}: IProps) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    />
  );
};
