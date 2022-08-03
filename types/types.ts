export type CollectionPackage = {
    congress: string;
    dateIssued: string;
    docClass: string;
    lastModified: string;
    packageId: string;
    packageLink: string;
    title: string;
}

export type ExactCollectionItemProps = {
    collectionPackage: CollectionPackage;
}