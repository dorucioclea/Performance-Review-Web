import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { StrengthsWeaknessesResultItem } from './StrengthsWeaknessesResultItem';
import { StrengthsWeaknessesResult_reviews$key } from './__generated__/StrengthsWeaknessesResult_reviews.graphql';

const fragment = graphql`
  fragment StrengthsWeaknessesResult_reviews on PersonReviewNode @relay(plural: true) {
    id
    isSelfReview

    strengths
    weaknesses
  }
`;

interface OwnProps {
  reviews: StrengthsWeaknessesResult_reviews$key;
}

export type Props = FCProps<OwnProps>;

export function StrengthsWeaknessesResult(props: Props) {
  const reviews = useFragment(fragment, props.reviews);
  return (
    <Fragment>
      <div>
        <h1>{i18n._('The most important characteristics or effective behaviors that he/she should maintain')}</h1>
        {reviews.map((review: any, index) => {
          return (
            <StrengthsWeaknessesResultItem isSelfReview={review.isSelfReview} items={review.strengths} key={index} />
          );
        })}
      </div>
      <div>
        <h2>{i18n._('The most important characteristics or behaviors he/she should improve')}</h2>
        {reviews.map((review: any, index) => {
          return (
            <StrengthsWeaknessesResultItem isSelfReview={review.isSelfReview} items={review.weaknesses} key={index} />
          );
        })}
      </div>
    </Fragment>
  );
}
