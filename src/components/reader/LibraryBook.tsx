"use client"

import { Box, Typography, Container, Divider} from "@mui/material"

interface Book {
  id: number
  title: string
  author: string
  image: string
}

const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 4,
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 5,
    title: "Harry Potter and the Order of Phoenix",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
]

export default function LibraryBooks() {
    return (
      <>
      <Typography variant="h3" color="inherit">My library</Typography>
      <Box sx={{ height: 2000, overflow: "auto"}}>
        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="inherit">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="inherit"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            

          </Typography>
        </Container>

        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>

        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>

        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>
        
        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>

        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>    

        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>
        
        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>

        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>

        <Divider orientation="horizontal"/>

        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex", // Align items in a row
            alignItems: "center", // Center vertically
            gap: 3, // Spacing between image and text
          }}
        >
          {/*for each function should come here*/}
        <Typography variant="body1" color="initial">1.</Typography>
          <img
            src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg"
            alt=""
            height={150}
            style={{ borderRadius: 8 }} // Optional rounded corners
          />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              maxWidth: 400, // Ensures text wraps into multiple lines
              lineHeight: 1.5, // Adds spacing between lines
              whiteSpace: "normal", // Allows text to wrap naturally
            }}
          >
            Harry Potter and the Philosopher's stone 
            Progress: 100/1000

          </Typography>
        </Container>
      </Box>
      </>
    );
  }
  
