import React, { Fragment } from "react";
import { ArrowRight } from "@/assets/icon";
import LoadingSpinner from "../LoadingSpinner";

interface ILoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isVisible: boolean;
}

const LoadMoreButton: React.FC<ILoadMoreButtonProps> = ({
  onClick,
  isLoading,
  isVisible,
}) => {
  return (
    <Fragment>
      {!isLoading && isVisible && (
        <div
          onClick={onClick}
          className="text-base font-medium text-center flex items-center justify-center gap-2 cursor-pointer py-4"
        >
          Load More
          <div className="flex flex-col">
            <ArrowRight
              className="rotate-90 -mb-[5px]"
              height={16}
              width={16}
            />
            <ArrowRight
              className="rotate-90 -mt-[5px]"
              height={16}
              width={16}
            />
          </div>
        </div>
      )}
      {isLoading && <LoadingSpinner className="mx-auto py-3" />}
    </Fragment>
  );
};

export default LoadMoreButton;
