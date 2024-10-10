import React, { useEffect } from 'react'
import type { SWRInfiniteResponse } from 'swr/infinite'
import { useIntersection } from '../../Utility/hooks'

type Props<T> = {
  swr: SWRInfiniteResponse<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
  loadingIndicator?: React.ReactNode
  endingIndicator?: React.ReactNode
  errorgIndicator?: React.ReactNode
  isReachingEnd: boolean | ((swr: SWRInfiniteResponse<T>) => boolean)
  offset?: number
  totalFetchIndicator?: React.ReactNode
}

const InfiniteScroll = <T,>(props: Props<T>): React.ReactElement<Props<T>> => {
  const {
    swr,
    swr: { setSize, data, isValidating, error, size },
    children,
    loadingIndicator,
    endingIndicator,
    errorgIndicator,
    isReachingEnd,
    offset = 0,
    totalFetchIndicator
  } = props;

  const [intersecting, ref] = useIntersection<HTMLDivElement>();

  const ending = typeof isReachingEnd === 'function' ? isReachingEnd(swr) : isReachingEnd;

  useEffect(() => {
    if (intersecting && !isValidating && !ending) {
      setSize((size) => size + 1)
    }
  }, [intersecting, isValidating, setSize, ending]);

  return (
    <>
      {typeof children === 'function' ? data?.map((item) => children(item)) : children}
      {error ? errorgIndicator :
        (<div style={{ position: 'relative' }}>
          <div ref={ref} style={{ position: 'absolute', top: offset }}></div>
          {size > 1 && totalFetchIndicator}
          {size > 1 && ending ? endingIndicator : loadingIndicator}
        </div>)}
    </>
  )
}

export default InfiniteScroll;
