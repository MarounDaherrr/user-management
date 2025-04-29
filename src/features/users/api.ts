export const getUsers = async (search: string, accessToken: string) => {
    try {
      const response = await fetch(`/api/users?search=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
      });
  
   
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.result?.message || "Failed to fetch users");
      }
  
      const data = await response.json();
  
      return data.result.data.users;
    } catch (error: unknown) {  
      if (error instanceof Error) {
        console.error("Error fetching users:", error.message);
        throw new Error(error.message || "Something went wrong while fetching users");
      } else {
        console.error("Unknown error:", error);
        throw new Error("An unknown error occurred while fetching users");
      }
    }
  };
  