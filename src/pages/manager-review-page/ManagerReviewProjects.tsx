import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectOutput } from 'src/shared/project-output';
import { useFragment } from 'react-relay/hooks';

import { ManagerReviewProjects_reviews$key } from './__generated__/ManagerReviewProjects_reviews.graphql';

const fragment = graphql`
  fragment ManagerReviewProjects_reviews on ProjectReviewNode @relay(plural: true) {
    id
    ...ProjectOutput_review
  }
`;

interface OwnProps {
  reviews: ManagerReviewProjects_reviews$key | null;
}

type Props = FCProps<OwnProps>;

export function ManagerReviewProjects(props: Props) {
  const reviews = useFragment(fragment, props.reviews);
  return (
    <Box padding={4}>
      {reviews?.map((review) => (
        <Box paddingY={4} key={review.id}>
          <ProjectOutput review={review} showProjectName />
        </Box>
      ))}
    </Box>
  );
}
