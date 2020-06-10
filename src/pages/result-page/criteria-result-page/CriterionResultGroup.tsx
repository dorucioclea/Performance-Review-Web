import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { peerReviewEvaluationDictionary } from 'src/global-types';

import { CriteriaResult_reviews$data } from './__generated__/CriteriaResult_reviews.graphql';
import { CriterionResultRatingGroup } from './CriterionResultRatingGroup';

interface OwnProps {
  title: string;
  reviews: CriteriaResult_reviews$data;
  prefix: 'sahabiness' | 'problemSolving' | 'execution' | 'thoughtLeadership' | 'leadership' | 'presence';
}

export type Props = FCProps<OwnProps>;

export function CriterionResultGroup(props: Props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <CriterionResultRatingGroup
        title={peerReviewEvaluationDictionary['SUPERB']}
        rating="SUPERB"
        prefix={props.prefix}
        reviews={props.reviews}
      />
      <CriterionResultRatingGroup
        title={peerReviewEvaluationDictionary['EXCEEDS_EXPECTATIONS']}
        rating="EXCEEDS_EXPECTATIONS"
        prefix={props.prefix}
        reviews={props.reviews}
      />
      <CriterionResultRatingGroup
        title={peerReviewEvaluationDictionary['MEETS_EXPECTATIONS']}
        rating="MEETS_EXPECTATIONS"
        prefix={props.prefix}
        reviews={props.reviews}
      />
      <CriterionResultRatingGroup
        title={peerReviewEvaluationDictionary['NEEDS_IMPROVEMENT']}
        rating="NEEDS_IMPROVEMENT"
        prefix={props.prefix}
        reviews={props.reviews}
      />
    </div>
  );
}
