'use client';

import { IoMdSearch } from 'react-icons/io';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import Link from 'next/link';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DialogTitle } from '@radix-ui/react-dialog';

export const SearchBox = () => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const router = useRouter();

  // Debounce the query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/products?term=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const { data: rawSuggestions = [] } = useQuery({
    queryKey: ['searchSuggestions', debouncedQuery],
    queryFn: async (): Promise<{ id: string; name: string }[]> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search/suggestions`,
        {
          params: { term: debouncedQuery },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data;
    },
    enabled: debouncedQuery.length > 2,
  });

  // Filter suggestions client-side to ensure they match the latest query
  const filteredSuggestions = rawSuggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(query.toLowerCase())
  );

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className='text-primary font-bold'>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredSuggestions.length) return;

    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex <= 0 ? filteredSuggestions.length - 1 : prevIndex - 1
      );
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      router.push(`/products/${filteredSuggestions[selectedIndex].id}`);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='icon' size='icon'>
          <IoMdSearch size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-2xl top-60'>
        <DialogHeader>
          <DialogTitle className='text-xl mt-4'>Search Products</DialogTitle>

          <DialogDescription className='sr-only'>
            Search for products
          </DialogDescription>
        </DialogHeader>
        <div className='h-60'>
          <form onSubmit={handleSubmit} className='relative'>
            <Input
              placeholder='Search'
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className='border-0 border-b shadow-none rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary pl-8'
            />

            <Button variant={'icon'} className='absolute -left-3 -top-1.5'>
              <IoMdSearch size={20} />
            </Button>
          </form>

          <ul className='mt-4'>
            {filteredSuggestions.length === 0 ? (
              <p className='text-sm text-gray-500'>No suggestions found.</p>
            ) : (
              filteredSuggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`cursor-pointer px-2 py-1 ${
                    selectedIndex === index ? 'bg-accent/5' : ''
                  }`}
                  onClick={() => {
                    router.push(`/products/${suggestion.id}`);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <Link href={`/products/${suggestion.id}`}>
                    {highlightText(suggestion.name, query)}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
