import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TestComponent } from "./TestComponent";

// We know that the API data is static, so we will do as little fetching as possible
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: Infinity,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TestComponent limit={50} offset={0} />
        </QueryClientProvider>
    );
}

export default App;
