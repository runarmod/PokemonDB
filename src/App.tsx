import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TestComponent } from "./TestComponent";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TestComponent pokemonId={1} />
        </QueryClientProvider>
    );
}

export default App;
