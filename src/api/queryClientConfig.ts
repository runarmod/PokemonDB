import { QueryClient } from "@tanstack/react-query";

// We know that the API data is static, so we will do as little fetching as possible
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: Infinity,
        },
    },
});

export default queryClient;
