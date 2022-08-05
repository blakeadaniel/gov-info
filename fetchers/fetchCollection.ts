import { ENDPOINTS } from "../constants/Endpoints";
import { API_KEY } from "../constants/Key";
import { QUERIES } from "../constants/Queries";
import { collectionDataActions } from "../state/collectionState";
import { queryClient } from "../store/queryClient";
import { UseExactCollectionsQueryProperties } from "./types";

const axios = require("axios");

export const fetchCollections = async ({
  collectionCode,
  lastModifiedStartDate,
  lastModifiedEndDate,
  pageSize,
  offsetMark = "%2A",
}: UseExactCollectionsQueryProperties) => {
  const myTemplate = ({
    collectionCode,
    lastModifiedStartDate,
    lastModifiedEndDate,
    pageSize,
    offsetMark,
  }: UseExactCollectionsQueryProperties) =>
    `${
      ENDPOINTS.GENERAL
    }${"collections"}/${collectionCode}/${lastModifiedStartDate}?pageSize=${pageSize}&offsetMark=${offsetMark}&api_key=${
      API_KEY.KEY
    }`;

  const formattedWithTemplate = myTemplate({
    collectionCode,
    lastModifiedStartDate,
    lastModifiedEndDate,
    pageSize,
    offsetMark,
  });
  const request = await axios.get(formattedWithTemplate);
  collectionDataActions.setCollectionData(request.data);
  return request?.data ?? [];
};
