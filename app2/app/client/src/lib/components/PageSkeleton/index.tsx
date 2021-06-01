import { Skeleton } from 'antd';
import { Fragment } from 'react';

export const PageSkeleton = () => {
  const skeletonParagraph = (
    <Skeleton
      active
      paragraph={{ rows: 4 }}
      className="page-skeleton__paragraph"
    />
  );

  return (
    <Fragment>
      {skeletonParagraph}
      {skeletonParagraph}
      {skeletonParagraph}
    </Fragment>
  );
};
