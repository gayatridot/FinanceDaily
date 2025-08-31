import type { LucideIcon } from 'lucide-react';
import { TrendingUp, Coins, PiggyBank, Landmark } from 'lucide-react';

export type FinancialTip = {
  id: number;
  topic: 'Investing' | 'Savings' | 'Budgeting' | 'Banking';
  tip: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    points: number;
  };
};

export const dailyFinancialTips: FinancialTip[] = [
  {
    id: 1,
    topic: 'Investing',
    tip: "Diversifying your investment portfolio across various asset classes can help mitigate risk. Don't put all your eggs in one basket!",
    quiz: {
      question: 'What is the primary benefit of diversifying an investment portfolio?',
      options: [
        'Guaranteeing high returns',
        'Reducing overall risk',
        'Eliminating all taxes',
        'Simplifying the investment process',
      ],
      correctAnswerIndex: 1,
      points: 10,
    },
  },
  {
    id: 2,
    topic: 'Savings',
    tip: 'Automate your savings. Set up a recurring transfer from your checking to your savings account each payday.',
    quiz: {
      question: 'What is a key advantage of automating savings?',
      options: [
        'It requires daily monitoring',
        'It helps save consistently without thinking about it',
        'It offers higher interest rates',
        'It is the only way to save money',
      ],
      correctAnswerIndex: 1,
      points: 10,
    },
  },
  {
    id: 3,
    topic: 'Budgeting',
    tip: 'The 50/30/20 rule is a simple budgeting guideline: 50% of your after-tax income on needs, 30% on wants, and 20% on savings and debt repayment.',
    quiz: {
      question: 'In the 50/30/20 budgeting rule, what is the 20% allocated for?',
      options: [
        'Wants and entertainment',
        'Housing and utilities',
        'Savings and debt repayment',
        'Taxes',
      ],
      correctAnswerIndex: 2,
      points: 15,
    },
  },
  {
    id: 4,
    topic: 'Banking',
    tip: 'High-yield savings accounts typically offer much higher interest rates than traditional savings accounts, helping your money grow faster.',
    quiz: {
      question: 'What is the main advantage of a high-yield savings account?',
      options: [
        'It has more physical branches',
        'It offers a higher interest rate',
        'It comes with a free checking account',
        'It has no minimum balance requirements',
      ],
      correctAnswerIndex: 1,
      points: 10,
    },
  },
  {
    id: 5,
    topic: 'Investing',
    tip: 'Compound interest is the interest on your initial principal, which also includes all of the accumulated interest from previous periods on a deposit or loan.',
    quiz: {
      question: 'What does compound interest mean?',
      options: [
        'Interest that is paid out annually',
        'Interest earned only on the principal amount',
        'Interest earned on both the principal and accumulated interest',
        'A lower interest rate over time',
      ],
      correctAnswerIndex: 2,
      points: 15,
    },
  },
  {
    id: 6,
    topic: 'Savings',
    tip: 'An emergency fund should ideally cover 3-6 months of essential living expenses. This fund is crucial for financial security.',
    quiz: {
      question: 'What is the recommended size for an emergency fund?',
      options: [
        '1 month of income',
        '1-2 weeks of expenses',
        '3-6 months of essential living expenses',
        'An entire year\'s salary',
      ],
      correctAnswerIndex: 2,
      points: 10,
    },
  },
];

export const topicIcons: { [key in FinancialTip['topic']]: LucideIcon } = {
  Investing: TrendingUp,
  Savings: Coins,
  Budgeting: PiggyBank,
  Banking: Landmark,
};
