import { Pagination } from 'antd';

interface IProps {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export const ListingsPagination = ({ total, page, limit, setPage }: IProps) => {
  return (
    <Pagination
      current={page}
      total={total}
      defaultPageSize={limit}
      hideOnSinglePage
      showLessItems
      onChange={(page: number) => setPage(page)}
      className="listings-pagination"
    />
  );
};
