import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layout/layout';
import CallToAction from '../layout/call-to-action';
import TopicsGrid from '../layout/topics-grid';
import ThreeColumnList from '../layout/three-column-list';
import ChangelogPreview from '../layout/changelog-preview';

class Index extends React.Component {
	render() {
		const { data: { homeYaml, allMdx } } = this.props;
		return (
			<Layout>
				<div style={{ marginTop: '-20px' }} className="container">
					<div className="row doc-content-well">
						<div className="row">
							<h1 className="title">Search Results</h1>
						</div>
						<div className="row" style={{ marginBottom: '15px' }}>

						</div>
						<div className="row mb-70">
							<div className="col-md-12">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-8 search-results">


									<div id="addsearch-results"></div>



									<script src="https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6&type=resultpage"></script>
									</div>
								</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Index;

export const pageQuery = graphql`
	{
		homeYaml {
			title
			call_to_action {
				title
				sub_title
				url
			}
			topics {
				title
				summary
				icon
				url
        secondary
			}
			three_column_links {
				title
        links {
          text
          url
        }
			}
			changelog_preview {
				title
				url
			}
		}

		allMdx(filter: {fileAbsolutePath: {regex: "/changelogs/"}}, sort: {fields: [fileAbsolutePath], order: DESC}, limit: 4) {
			edges {
				node {
					id
					frontmatter {
						title
					}
					fields {
						slug
						markdownBody {
							childMdx {
								code {
									body
								}
							}
						}
					}
				}
			}
		}
	}
`;
