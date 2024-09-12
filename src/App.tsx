import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClientConfig";
import List from "./components/List";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <List limit={50} offset={0} />
        </QueryClientProvider>
    );
}

export default App;
