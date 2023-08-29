import React from 'react';
import {render} from '@testing-library/react-native';
import {Comment} from '../src/screens/posts/Comment';

describe('Comment', () => {
  const comment = {
    name: 'Sample Comment',
    body: 'This is a sample comment body.',
    postId: 1,
    id: 1,
    email: 'test@test.com',
  };

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    id: 1,
    address: {
      city: 'New York',
      street: 'Wall Street',
      suite: 1,
      zipcode: '12345',
      geo: {
        lat: -1231231231,
        lng: 1232312323,
      },
    },
    username: 'John Doe Test',
    phone: 123456789,
    website: 'test.com',
    company: {
      name: 'Test Company',
      bs: 'Test BS',
      catchPhrase: 'Test Catch Phrase',
    },
  };

  it('renders comment details correctly', () => {
    const {getByText} = render(<Comment comment={comment} user={user} />);

    const userNameElement = getByText(user.name);
    const userEmailElement = getByText(user.email);
    const commentTitleElement = getByText(comment.name);
    const commentBodyElement = getByText(comment.body);

    expect(userNameElement).toBeTruthy();
    expect(userEmailElement).toBeTruthy();
    expect(commentTitleElement).toBeTruthy();
    expect(commentBodyElement).toBeTruthy();
  });
});
