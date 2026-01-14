export const NAVIGATION_QUERY = `
  query NavigationItems {
    navigationItemCollection(order: order_ASC) {
      items {
        sys { id }
        label
        order
        page {
          slug
        }
      }
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    siteSettingsCollection(limit: 1) {
      items {
        sys { id }
        siteName
        email
        githubUrl
        linkedinUrl
        profileImage {
          url
          width
          height
          description
        }
      }
    }
  }
`;

export const PAGE_BY_SLUG_QUERY = `
  query PageBySlug($slug: String!) {
    pageCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id }
        title
        slug
        heroTitle
        heroText
        body {
          json
        }
        heroImage {
          url
          width
          height
          description
        }
        seoTitle
        seoDescription
        mediaCollection {
          items {
            url
            description
            fileName
            contentType
            width
            height
          }
        }
      }
    }
  }
`;

export const PROJECT_LIST_QUERY = `
  query ProjectList {
    projectCollection(order: order_DESC) {
      items {
        sys { id }
        title
        slug
        excerpt
        featured
        order
        coverImage {
          url
          width
          height
          description
        }
        techCollection(limit: 10) {
          items {
            sys { id }
            name
          }
        }
      }
    }
  }
`;

export const PROJECT_BY_SLUG_QUERY = `
  query ProjectBySlug($slug: String!) {
    projectCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id }
        title
        slug
        excerpt
        description {
          json
        }
        projectUrl
        githubUrl
        featured
        coverImage {
          url
          width
          height
          description
        }
        techCollection(limit: 12) {
          items {
            sys { id }
            name
            category
            url
            icon {
              url
              width
              height
              description
            }
          }
        }
      }
    }
  }
`;

export const PROJECT_SLUGS_QUERY = `
  query ProjectSlugs {
    projectCollection {
      items {
        slug
      }
    }
  }
`;

export const TECH_LIST_QUERY = `
  query TechList {
    techCollection {
      items {
        sys { id }
        name
        category
        slug
        url
        icon {
          url
          width
          height
          description
        }
      }
    }
  }
`;
