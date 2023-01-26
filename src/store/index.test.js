import { render, screen } from "@testing-library/react"
import Header from "../components/Layout/Header"
import ExpensePage from "../components/pages/ExpensePage";
import Home from "../components/pages/Home";
import ProfilePage from "../components/pages/ProfilePage";

describe('App components', () => {
    test('renders header component', () => {
        render(<Header />);

        const welcomeNote = screen.getByText(
            'Welcome to expense tracker',{exact: false})
            expect(welcomeNote).toBeInTheDocument();
    })

    test('renders home component', () => {
        render(<Home />);

        const welcomeNote = screen.getByText(
            'home',{exact: false})
            expect(welcomeNote).toBeInTheDocument();
    })

    test('renders profile component', () => {
        render(<ProfilePage />);

        const profile = screen.getByText(
            'complete profile',{exact: false})
            expect(profile).toBeInTheDocument();
    })

    test('renders expense component', () => {
        render(<ExpensePage />);

        const expense = screen.getByText(
            'add new expense',{exact: false})
            expect(expense).toBeInTheDocument();
    })

    test('renders profile component', () => {
        render(<ProfilePage />);

        const profile = screen.getByText(
            'contact details',{exact: false})
            expect(profile).toBeInTheDocument();
    })
});