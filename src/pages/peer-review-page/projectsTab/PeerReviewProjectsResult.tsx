import { i18n } from '@lingui/core';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { ProjectCommentsOutput, ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { PeerReviewProjectsResult_projectReview$key } from './__generated__/PeerReviewProjectsResult_projectReview.graphql';

interface OwnProps {
  projectReview: PeerReviewProjectsResult_projectReview$key;
}

type Props = FCProps<OwnProps> & StyleProps;

const fragment = graphql`
  fragment PeerReviewProjectsResult_projectReview on ProjectReviewNode {
    id
    reviewee {
      id
      firstName
      ...getUserLabel_user
    }
    project {
      name
    }
    ...ProjectOutput_review
    comments {
      ...ProjectCommentsOutput_comments
    }
  }
`;

export function PeerReviewProjectsResult(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);

  const projectName = projectReview.project.name;
  const name = getUserLabel(projectReview.reviewee);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h5">{projectName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("{name}'s comment about his/her performance compared to initial expectation", { name })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <QuoteBox>
              <ProjectOutput review={projectReview} />
            </QuoteBox>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("Your comment about {name}'s performance in this project", { name })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProjectCommentsOutput comments={projectReview.comments} />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const styles = (theme: Theme) => ({
  detailTypography: {
    color: theme.palette.grey[700],
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ProjectResult' });
type StyleProps = Styles<typeof styles>;