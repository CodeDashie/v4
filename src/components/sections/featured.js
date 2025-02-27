import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProjectsSection = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 10px 5px 0;
      }
    }
    .project-links {
      justify-content: flex-start;
      margin-left: -10px;
      margin-right: 0;
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    margin-bottom: 22px;

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    margin-bottom: 25px;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      //opacity: 0.25;
    }

    a {
      width: 854px;
      height: 100%;
      //background-color: var(--green);
      //border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        //background: transparent;
        outline: 0;

        &:before,
        .img {
          //background: transparent;

          //filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 854px;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        //transition: var(--transition);
        //background-color: var(--navy);
        //mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      //mix-blend-mode: multiply;
      //filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              text2
              cover {
                childImageSharp {
                  gatsbyImageData(width: 854, quality: 100, formats: [PNG])
                }
              }
              code {
                childImageSharp {
                  gatsbyImageData(width: 854, quality: 100, formats: [PNG])
                }
              }
              tech
              github
              external
              youtube0
              youtube11
              youtube3
              cta
              text
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Show more button

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);
  const projectInner = node => {
    const { frontmatter, html } = node;
    const { text2, youtube11, youtube1, youtube0, youtube3, title, code } = frontmatter;
    const image = getImage(code);

    return (
      <div className="project-inner">
        <row>
          <div className="embed-responsive embed-responsive-16by9">
            <p>
              {html && (
                <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
              )}

              {youtube0 && (
                <iframe
                  title={title}
                  className="embed-responsive-item"
                  width="854"
                  height="480"
                  src="https://www.youtube.com/embed/rHxoP1izwuM"
                  frameBorder="0"
                  allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              )}
              {youtube11 && (
                <iframe
                  title={title}
                  className="embed-responsive-item"
                  width="854"
                  height="480"
                  src="https://www.youtube.com/embed/hAwY1_HZJNo"
                  frameBorder="0"
                  allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              )}
              {youtube3 && (
                <iframe
                  title={title}
                  className="embed-responsive-item"
                  width="854"
                  height="480"
                  src="https://www.youtube.com/embed/Ucv-FgGaWsg"
                  frameBorder="0"
                  allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              )}
            </p>

            {text2 && (
              <div className="project-description" dangerouslySetInnerHTML={{ __html: text2 }} />
            )}

            <div className="project-image">
              <GatsbyImage image={image} alt={title} className="img" />
            </div>

            {youtube1 && (
              <p>
                <iframe
                  title="DOC"
                  width="854"
                  height="900"
                  src="/doc.pdf"
                  className="resume-link"></iframe>
              </p>
            )}
            {youtube11 && (
              <div
                className="project-description"
                dangerouslySetInnerHTML={{
                  __html:
                    'Earlier on in the year (2021) I worked as part of a team for a practice project. This AI system was used to merge with a previous programmers AI system (Combat AI) to complement it. The AI will do its attacks with choices on moving while attacking, stop at point and attach and attack and stop when within range. Both AIs end up working together with nothing breaking.',
                }}
              />
            )}
            {youtube11 && (
              <iframe
                title={title}
                className="embed-responsive-item"
                width="854"
                height="480"
                src="https://www.youtube.com/embed/270R4QChra4"
                frameBorder="0"
                allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            )}
          </div>
        </row>
      </div>
    );
  };

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Featured Projects
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter } = node;
            const { external, title, tech, github, cover, cta, text } = frontmatter;
            const image = getImage(cover);
            const [showMore, setShowMore] = useState(false);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <tab>
                  <row>
                    <div className="project-content">
                      <div>
                        <h3 className="project-title">
                          <a href={external}>{title}</a>
                        </h3>

                        <div
                          className="project-description"
                          dangerouslySetInnerHTML={{ __html: text }}
                        />

                        <div className="project-image">
                          <a href={external ? external : github ? github : '#'}>
                            <GatsbyImage image={image} alt={title} className="img" />
                          </a>
                        </div>

                        {tech.length && (
                          <ul className="project-tech-list">
                            {tech.map((tech, i) => (
                              <li key={i}>{tech}</li>
                            ))}
                          </ul>
                        )}

                        <div className="project-links">
                          {cta && (
                            <a href={cta} aria-label="Course Link" className="cta">
                              Learn More
                            </a>
                          )}
                          {github && (
                            <a href={github} aria-label="GitHub Link">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {external && !cta && (
                            <a href={external} aria-label="External Link" className="external">
                              <Icon name="External" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </row>
                  <row>
                    <StyledProjectsSection>
                      {showMore ? projectInner(node) : <></>}

                      <button
                        name={title}
                        className="more-button"
                        onClick={() => setShowMore(!showMore)}>
                        Show {showMore ? 'Less' : 'More'}
                      </button>
                    </StyledProjectsSection>
                  </row>
                </tab>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
