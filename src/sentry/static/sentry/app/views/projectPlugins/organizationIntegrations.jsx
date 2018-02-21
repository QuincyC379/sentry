import {Box} from 'grid-emotion';
import React from 'react';
import styled from 'react-emotion';

import {t} from '../../locale';
import AsyncComponent from '../../components/asyncComponent';
import Link from '../../components/link';
import Panel from '../settings/components/panel';
import PanelBody from '../settings/components/panelBody';
import PanelHeader from '../settings/components/panelHeader';
import PluginIcon from '../../plugins/components/pluginIcon';
import Row from '../settings/components/row';
import theme from '../../utils/theme';

const ProviderName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
`;

const TeamName = styled.div`
  color: ${p => p.theme.gray2};
  font-size: 14px;
`;

export default class OrganizationIntegrations extends AsyncComponent {
  // TODO: proptypes

  getEndpoints() {
    let {orgId} = this.props.params;

    return [['config', `/organizations/${orgId}/config/integrations/`]];
  }

  renderBody() {
    // TODO: This is for sure being passsed in to many things
    let {orgId, projectId} = this.props.params;

    return (
      <Panel>
        <PanelHeader disablePadding={true}>
          <Box px={2} flex="1">
            {t('Global Integrations')}
          </Box>
        </PanelHeader>
        <PanelBody>
          {this.state.config.providers.map(provider => {
            return (
              <Row key={provider.key}>
                <Box>
                  <PluginIcon size={32} pluginId={provider.key} />
                </Box>
                <Box px={2} flex={1}>
                  <ProviderName>
                    <Link
                      to={`/settings/organization/${orgId}/project/${projectId}/integrations/${provider.key}/`}
                      css={{color: theme.gray5}}
                    >
                      {provider.name}
                    </Link>
                  </ProviderName>
                  <TeamName>{provider.metadata.author}</TeamName>
                </Box>
              </Row>
            );
          })}
        </PanelBody>
      </Panel>
    );
  }
}