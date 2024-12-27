/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";

const selectProducts = (state: any) => state.products.products;

export const selectLikedProducts = createSelector(
  [selectProducts],
  (products) => products.filter((product: any) => product.isLiked)
);
