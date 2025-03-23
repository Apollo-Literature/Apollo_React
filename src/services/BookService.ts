export interface BookData {
  title: string;
  author: string;
  category: string;
  description: string;
  price: string;
  publishedDate: string;
  isbn: string;
  language: string;
  pageCount: string;
  tags: string;
  visibility: string;
  thumbnail: File | null;
  file: File | null;
}

export const uploadBook = async (bookData: BookData) => {
  // Mock implementation of book upload
  console.log("Uploading book:", bookData);
  return true;
};

export const getBooks = async () => {
  // Mock implementation of fetching books
  return [
    { id: 1, title: "Book 1", author: "Author 1", sales: 100 },
    { id: 2, title: "Book 2", author: "Author 2", sales: 200 },
  ];
};
