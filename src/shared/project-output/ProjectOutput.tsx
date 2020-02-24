import { i18n } from '@lingui/core';
import { Grid, Typography } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { MultilineOutput } from 'src/shared/multiline-output';
import { ProjectOutput_review$key } from 'src/shared/project-output/__generated__/ProjectOutput_review.graphql';
import { FCProps } from 'src/shared/types/FCProps';

const fragment = graphql`
  fragment ProjectOutput_review on ProjectReviewNode {
    text
    rating
    project {
      name
    }
  }
`;

interface OwnProps {
  review: ProjectOutput_review$key;
  type: 'self' | 'peer';
  showProjectName?: boolean;
}

type Props = FCProps<OwnProps>;

export function ProjectOutput(props: Props) {
  const { type, showProjectName = false } = props;
  const review = useFragment(fragment, props.review);

  return (
    <Grid container spacing={2}>
      {showProjectName && (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {review.project.name}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Performance to initial expectation')}:
        </Typography>
        <EvaluationOutput value={review.rating as Evaluation} type={type} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Accomplishments')}:
        </Typography>
        <MultilineOutput value={review.text} />
      </Grid>
    </Grid>
  );
}