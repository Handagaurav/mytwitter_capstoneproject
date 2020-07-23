import * as React from 'react';

const Count: React.FunctionComponent<{
  count: number;
}> = (PostsProps) => {
  return <h1>{PostsProps.count}</h1>;
};

export default Count;