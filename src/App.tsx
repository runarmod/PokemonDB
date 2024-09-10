import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { TestComponent } from "./TestComponent";
import queryClient from "./api/queryClientConfig";
import FilterList from "./components/SortAndFilter";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <FilterList></FilterList>
            <TestComponent limit={50} offset={0} />
        </QueryClientProvider>
    );
}

export default App;
