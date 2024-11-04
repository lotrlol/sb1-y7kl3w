import { Handler } from '@netlify/functions';
import { getUser } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event, context) => {
  // Verify authentication - only check if user is logged in
  const user = await getUser(context);
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Please log in to generate pages' })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { content, path } = JSON.parse(event.body || '');
    
    // Store content in localStorage instead of GitHub
    const pages = JSON.parse(localStorage.getItem('generated_pages') || '[]');
    pages.push({
      content,
      path,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('generated_pages', JSON.stringify(pages));

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Page created successfully',
        path
      })
    };
  } catch (error) {
    console.error('Error creating page:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating page' })
    };
  }
};

export { handler };