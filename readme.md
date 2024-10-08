# Food Ordering System

This project manages hotels, users, and food items using unique IDs for each entity. The following is a breakdown of how IDs are generated and managed.

## ID Structure

1. **Hotel ID (`hotelId`)**: 
   - Generated using **3 random alphabets** followed by **2 random numbers**.
   - Example: `ABC12`

2. **User ID (`userId`)**:
   - When a hotel is created by the user, the `hotelId` is used to generate the `userId`.
   - `userId` is constructed as the `hotelId` followed by **5 random numbers**.
   - Example: `ABC1256789`

3. **Food ID (`foodId`)**:
   - When food is created, the `foodId` is generated similarly to `userId`.
   - `foodId` is constructed as the `hotelId` followed by **5 random numbers**.
   - Example: `ABC1298765`

## Key Concepts

- **Sparse Attribute**:  
  In the user schema, `userId` is marked as a sparse attribute because when the user is initially created, no `hotelId` is available. This attribute will remain empty until a hotel is created by the user, at which point the `hotelId` is added, and the `userId` is generated.

- **ID Generation Process**:
  - **User Creation**: When a user is created, `userId` is not generated immediately because the hotel is yet to be created.
  - **Hotel Creation**: Once the user creates a hotel, the `hotelId` is generated and assigned to the user, after which the `userId` is also created.
  - **Food Creation**: `foodId` is generated at the time of food item creation, using the `hotelId` as part of the identifier.

## Example Scenario

1. **User Creation**:  
   When a user signs up, they do not have a `userId` since they have not created a hotel yet.
   
2. **Hotel Creation**:  
   Once the user creates a hotel, a `hotelId` like `XYZ45` is generated, and at the same time, the `userId` is updated to something like `XYZ4512345`.
   
3. **Food Creation**:  
   When a food item is added, a `foodId` like `XYZ4567890` is generated based on the `hotelId`.

## Technologies Used

- MongoDB (for schema with sparse attributes)
- Node.js (for backend services)
- JavaScript (for ID generation logic)

## License

This project is licensed under the MIT License.
