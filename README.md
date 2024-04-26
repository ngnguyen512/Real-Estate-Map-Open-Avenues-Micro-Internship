
# An Interactive Map Application for Real Estate Prospecting

Submit By: **Ha Nguyen**  


Time spent: **50 hours spent in total**  


**Description**: This project is designed to empower real estate brokers with data-driven insights and search capabilities, enabling them to efficiently identify new leads and prospects.  



**1. Required Feature**
- Create a responsive layout with a header, sidebar, and content block.  
- Map Integration: Leverages react-map-gl for embedding and interacting with map components.  
- Map Features:  
  Pins: Users can place and customize pins on the map.  
  Popups: Popups provide additional information when a map pin or area is clicked.  
  Layers: Custom layers can be added to the map for enhanced interactivity and visualization.  
  Navigation Controls: Allows users to navigate the map interactively.  
  Terrain Layer: Incorporates a terrain vector source and layer to enrich the map details.  
- GraphQL Integration: Uses Apollo Client to execute GraphQL queries within the application.  
- Parcel Data Integration: Integrates a parcels source from a specific URL to visualize parcel boundaries and fill styles.  
- Fetch Data with GraphQL: Use the parcel ID to fetch building information from the object in our GraphQL API.  
- Display Data on Sidebar  
- Search by Address Feature: Using the Google Geocoder API to convert user input into geographical coordinates.  


**2. Visuals and Demos**
   
![real estate](https://github.com/ngnguyen512/HA-S-ESTATE/assets/133614681/0aeb9dbb-20bd-4224-a0d3-ccd84edf2d40)



**3. Getting Started**

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### 4. Technologies and Tools

#### Web Development and Deployment
- **Next.js**: Utilized for its server-side rendering capabilities, enhancing SEO and improving load times for dynamic content.
- **Vercel**: Chosen for deploying the application, providing seamless integration with Next.js and enabling automatic deployments, previews, and rollbacks from GitHub repositories.
- **Git/GitHub**: Used for source control management.

#### Interactive Map Display and Layering
- **Mapbox GL**: Employs Mapbox GL for interactive map displays. Tilesets are custom created and hosted on Mapbox Studio, providing detailed layers for property visualization. For further reading on Mapbox GL, visit the [Mapbox documentation](https://docs.mapbox.com/).

#### Data Fetching and Backend Management
- **GraphQL and Apollo Client**: GraphQL is used for its efficient data fetching capabilities, significantly reducing the amount of data transferred over the network. Apollo Client enhances the development process by managing data interactions between GraphQL and the frontend.
- **Azure Data API**: Integrates the Data API builder for Azure Databases as a GraphQL server, improving backend functionality by streamlining data access and management.

#### Web Programming
- **ReactJS**: Employed for writing robust web logic.

#### Geolocation and Street View Integration
- **Google API**: Includes Google Geocoding API for converting addresses into geographic coordinates. For more information, visit the [Google Geocoding API documentation](https://developers.google.com/maps/documentation/geocoding/overview).

