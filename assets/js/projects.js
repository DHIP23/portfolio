/**
 * projects.js
 * ─────────────────────────────────────────────────────────────
 * Source de vérité des 6 projets + moteur de rendu des cartes.
 * Pour modifier un projet : éditer uniquement le tableau PROJECTS.
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ════════════════════════════════════════════════════════════
   DONNÉES PROJETS
   ════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 'ged-ministerielle',
    title: 'Système de Gestion Électronique de Documents (GED)',
    sector: 'Ministère Du Plan et du Developpement',
    status: 'online',          // 'online' | 'ready'
    statusLabel: 'En ligne',
    icon: 'bi-file-earmark-check',
    image: 'assets/images/projects/ged.jpg',               // 'assets/images/projects/ged.jpg' quand disponible
    shortProblem: 'Mémoire documentaire fragile, recherche d\'archives'+
    'fastidieuse, partage d\'information inefficace dans'+
    'une organisation entièrement papier.',
    kpis: [
      'Délais de recherche réduits de 70-80%',
      'Traçabilité 100% des documents (audit trail)',
      'Zéro perte d\'archives critiques'
    ],
    tech: ['Laravel', 'MySQL', 'RBAC', 'OCR', 'php', 'javascript', 'tailwind'],
    qqoqccp: {
      Qui: 'Ministère — équipes administratives, archivistes, responsables hiérarchiques,  citoyens',
      Quoi: 'Système de GED : numérisation, indexation, classification, recherche et partage sécurisé',
      Où:   'on-premise',
      Quand:'Développé et mis en production — accessible en ligne',
      Comment: 'Conception UML, développement full-stack, déploiement on-premise, RBAC multi-profils',
      Combien: 'Volumes documentaires importants, recherche instantanée',
      Pourquoi:'Conserver la mémoire documentaire, sécuriser les archives, améliorer la traçabilité administrative, souveraineté numérique'
    },
    impact: 'Sécurisation de la mémoire institutionnelle, conformité  légale renforcée, souveraineté numérique assurée.',
    reutilisation: 'Réplicable dans tout ministère ou institution. Marché potentiel : 50+ institutions en Afrique de l\'Ouest.',
    url: 'https://siged-mpd.plan.ci/'
  },
  {
    id: 'gestion-projets',
    title: 'Système de Gestion de Projets',
    sector: 'Ministère — Pilotage de projets publics',
    status: 'ready',
    statusLabel: 'Production ready',
    icon: 'bi-kanban',
    image: 'assets/images/projects/GCPMPD.JPG',
    shortProblem: 'Projets abandonnés faute de coordination, résultats attendus non atteints malgré des enjeux importants pour les populations bénéficiaires.',
    kpis: [
      'Visibilité temps réel pour les décideurs',
      'Rapports d\'avancement automatisés',
      'Traçabilité complète des décisions',
      'Gestion axée sur les résultats'
    ],
    tech: ['Laravel', 'MySQL', 'RBAC', 'OCR', 'php', 'javascript', 'tailwind'],
    qqoqccp: {
      Qui: 'Directeur de cabinet, chefs de projet, contrôleurs de gestion',
      Quoi: 'Plateforme de pilotage de projets publics orienté PND : jalons, budgets, ressources, reporting',
      Où:   'Déployable on premise ou en cloud',
      Quand:'Solution finalisée, en attente de déploiement',
      Comment: 'Conception itérative avec les métiers, Suivi PND, tableau de bord exécutif',
      Combien: 'Gestion multi-projets simultanés, reporting automatisé',
      Pourquoi:'améliorer l’atteinte des résultats de développement'
    },
    impact: 'Professionnalisation de la gestion de projets publics, réduction des dépassements , pilotage orienté résultats.',
    reutilisation: 'Adaptable à tout organisme public, collectivité territoriale ou agence de développement.',
    url: null
  },
  {
    id: 'dashboard-stats',
    title: 'Dashboard d\'Indicateurs Statistiques Multi-sources',
    sector: 'Décision publique — Data Intelligence',
    status: 'ready',
    statusLabel: 'Production ready',
    icon: 'bi-graph-up-arrow',
    image: 'assets/images/projects/ci_dashboard.JPG',
    shortProblem: 'Données économiques et sociales dispersées entre Banque Mondiale, Nations Unies (SDG) et PNUD (HDR), inaccessibles pour les décideurs sans traitement manuel.',
    kpis: [
      '3 sources internationales agrégées en un seul outil',
      'Actualisation automatique via API (temps réel)',
      'Collecte ramenée de plusieurs jours à quelques secondes'
    ],
    tech: ['Python', 'JavaScript', 'CSS', 'API REST', 'Numpy','Pandas'],
    qqoqccp: {
      Qui: 'Ministère du Plan et du Developpement, Finances, PME',
      Quoi: 'Dashboard interactif agrégeant indicateurs économiques et sociaux en temps réel',
      Où:   'Déployable on premise ou en cloud',
      Quand:'Solution finalisée avec données actualisées via API',
      Comment: 'pipeline ETL + API Banque Mondiale / Nations Unies SDG / PNUD HDR + visualisation',
      Combien: 'Centaines d\'indicateurs, 3+ sources, actualisation periodique',
      Pourquoi:'Faciliter la prise de décision basée sur les données (data-driven)'
    },
    impact: 'Accès facilité aux indicateurs macroéconomiques,aide à la décision fondée sur les données pour les planificateurs et analystes publics.',
    reutilisation: 'Adaptable à tout secteur : santé, éducation, agriculture. Fort potentiel de déploiement en mode SaaS.',
    url: 'https://ci-dashboard-w1dq.onrender.com/'
  },
  {
    id: 'gestion-cartes',
    title: 'Système de Gestion de Cartes de Visite (OCR)',
    sector: 'Cabinet ministériel — Protocole',
    status: 'online',
    statusLabel: 'En ligne',
    icon: 'bi-person-vcard',
    image: 'assets/images/projects/Digicarte.JPG',
    shortProblem: 'Contacts VIP gérés par cartes papier : risque de perte, aucune exploitabilité, aucune recherche possible.',
    kpis: [
      'Temps de saisie réduit de 85 % grâce à l\'OCR automatique',
      'Base de contacts 100 % structurée et interrogeable',
      'Zéro risque de perte de carte'
    ],
    tech: ['Django', 'Tesseract OCR', 'PostgreSQL', 'Export CSV'],
    qqoqccp: {
      Qui: 'Cabinet d\'un ministre — assistants, chargés de mission, équipe de protocole',
      Quoi: 'Application de numérisation et gestion structurée des cartes de visite via OCR',
      Où:   'Déployé en ligne, accessible via navigateur',
      Quand:'En production, accessible',
      Comment: 'Scan → OCR automatique → correction manuelle → enregistrement → export',
      Combien: 'Des centaines à milliers de cartes, recherche instantanée',
      Pourquoi:'Transformer un carnet d\'adresses papier en base de contacts sécurisée'
    },
    impact: 'Sécurisation du capital relationnel institutionnel, professionnalisation de la gestion du protocole.',
    reutilisation: 'PApplicable dans tout cabinet, ambassade ou organisation internationale.',
    url: 'https://votre-lien-ocr.example.com'
  },
  {
    id: 'diligences-ministeriales',
    title: 'Système de Gestion des Diligences Ministérielles',
    sector: 'Cabinet ministériel — Gouvernance',
    status: 'ready',
    statusLabel: 'Production ready',
    icon: 'bi-clipboard2-check',
    image: 'assets/images/projects/Diligences1.JPG',
    shortProblem: 'Instructions ministérielles non tracées, risque élevé de non-suivi, absence de reddition de comptes formelle.',
    kpis: [
      '100% des diligences tracées (RACI)',
      'Tableau de bord exécutif en temps réel',
      'Historique complet et auditable des décisions'
    ],
    tech: ['Django', 'RACI', 'GANTT', 'KANBAN', 'PostgreSQL', 'RBAC', 'Javascript'],
    qqoqccp: {
      Qui: 'Directeur de cabinet, ministre, chargés de mission, secrétariat général',
      Quoi: 'Système de suivi des diligences avec RACI, GANTT, KANBAN et workflows ministériels',
      Où:   'Local — déployable en environnement sécurisé',
      Quand:'Production-ready, livrée et fonctionnelle',
      Comment: 'Modélisation des workflows institutionnels + alertes + notifications automatiques',
      Combien: 'Gestion de diligences multiples simultanées avec priorisation',
      Pourquoi:'Structurer et tracer le suivi des engagements pour améliorer la gouvernance'
    },
    impact: 'Gouvernance interne renforcée, réduction du risque de non-suivi, conformité aux exigences de bonne gouvernance institutionnelle.',
    reutilisation: 'Solution sans équivalent direct sur le marché africain. Réplicable dans tout cabinet ministériel ou institution de gouvernance.',
    url: 'https://diligences.onrender.com/'
  },
  {
    id: 'itsm-helpdesk',
    title: 'Système de Gestion des Requêtes IT (ITSM)',
    sector: 'DSI — Support informatique institutionnel',
    status: 'ready',
    statusLabel: 'Production ready',
    icon: 'bi-headset',
    image: 'assets/images/projects/ITSM.JPG',
    shortProblem: 'Support IT géré par email et téléphone : tickets égarés, SLA non mesurés, satisfaction non évaluée, aucune visibilité pour la direction.',
    kpis: [
      'SLA mesurés et suivis en temps réel',
      'Zéro ticket perdu (traçabilité 100%)',
      'Rapport mensuel automatisé pour la direction'
    ],
    tech: ['Django', 'PostgreSQL', 'SLA Engine', 'Notifications', 'Workflows'],
    qqoqccp: {
      Qui: 'DSI d\'un ministère — agents, techniciens support, responsable RSSI, direction',
      Quoi: 'Système ITSM avec tickets, SLA, escalade et tableau de bord support',
      Où:   'Déployable en intranet ministériel',
      Quand:'Solution finalisée, en attente de déploiement',
      Comment: 'Django + workflow engine + SLA automatique + notifications + KPI dashboard',
      Combien: 'Flux de tickets illimité, SLA paramétrables, reporting automatique',
      Pourquoi:'Professionnaliser le support IT et sortir de l\'informel'
    },
    impact: 'Professionnalisation du support IT, mesure objective des niveaux de service, sortie de l\'informel.',
    reutilisation: 'Alternative souveraine à ServiceNow/Jira. Fort potentiel dans toutes les DSI institutionnelles africaines.',
    url: 'https://itsm-0256.onrender.com/'
  }
];

/* ════════════════════════════════════════════════════════════
   RENDU — CARTES PROJETS
   ════════════════════════════════════════════════════════════ */

/**
 * Génère le HTML d'une carte projet.
 * @param {Object} project
 * @returns {string} HTML
 */
function renderProjectCard(project) {
  const statusClass = project.status === 'online' ? 'project-status--online' : 'project-status--ready';
  const statusIcon  = project.status === 'online' ? 'bi-circle-fill' : 'bi-clock';

  const imageHTML = project.image
    ? `<img src="${project.image}" alt="Capture d'écran — ${project.title}" loading="lazy" />`
    : `<i class="bi ${project.icon} project-card__image--placeholder" aria-hidden="true"></i>`;

  const kpisHTML = project.kpis
    .slice(0, 3)
    .map(k => `
      <div class="project-kpi-item">
        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
        <span>${k}</span>
      </div>`)
    .join('');

  const techHTML = project.tech
    .map(t => `<span class="tech-tag">${t}</span>`)
    .join('');

  const externalBtn = project.url
    ? `<a href="${project.url}" target="_blank" rel="noopener" class="btn-detail" aria-label="Voir le projet en ligne">
         Voir en ligne <i class="bi bi-box-arrow-up-right ms-1" aria-hidden="true"></i>
       </a>`
    : '';

  return `
    <div class="col-md-6 col-xl-4 project-item" data-status="${project.status}" data-animate="fade-up">
      <article class="project-card" role="article"
        onclick="openProjectModal('${project.id}')"
        aria-label="Voir le détail : ${project.title}"
        tabindex="0"
        onkeydown="if(event.key==='Enter'||event.key===' '){openProjectModal('${project.id}')}"
      >
        <div class="project-card__image">
          ${imageHTML}
        </div>
        <div class="project-card__body">
          <div class="d-flex align-items-center gap-2">
            <span class="project-status ${statusClass}">
              <i class="bi ${statusIcon} me-1" aria-hidden="true"></i>${project.statusLabel}
            </span>
          </div>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__sector">${project.sector}</p>
          <p class="project-card__problem">${project.shortProblem}</p>
          <div class="project-kpis" aria-label="Indicateurs clés">
            ${kpisHTML}
          </div>
          <div class="tech-tags" aria-label="Technologies">
            ${techHTML}
          </div>
        </div>
        <div class="project-card__footer">
          <button class="btn-detail" aria-label="Voir le détail du projet ${project.title}">
            Voir l'étude de cas <i class="bi bi-arrow-right" aria-hidden="true"></i>
          </button>
          ${externalBtn}
        </div>
      </article>
    </div>`;
}

/**
 * Génère le contenu complet de la modal QQOQCCP.
 * @param {string} projectId
 */
function openProjectModal(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const qqoqccpRows = Object.entries(project.qqoqccp)
    .map(([k, v]) => `
      <tr>
        <td class="fw-semibold text-navy">${k}</td>
        <td class="text-muted">${v}</td>
      </tr>`)
    .join('');

  const kpiItems = project.kpis
    .map(k => `<li class="mb-1"><i class="bi bi-check-circle-fill text-success me-2" aria-hidden="true"></i>${k}</li>`)
    .join('');

  const techBadges = project.tech
    .map(t => `<span class="tech-tag me-1 mb-1">${t}</span>`)
    .join('');

  const externalBtn = project.url
    ? `<a href="${project.url}" target="_blank" rel="noopener" class="btn btn-outline-primary btn-sm mt-2">
         <i class="bi bi-box-arrow-up-right me-1"></i>Accéder au projet en ligne
       </a>`
    : '';

  const statusBadge = project.status === 'online'
    ? `<span class="project-status project-status--online"><i class="bi bi-circle-fill me-1"></i>${project.statusLabel}</span>`
    : `<span class="project-status project-status--ready"><i class="bi bi-clock me-1"></i>${project.statusLabel}</span>`;

  document.getElementById('projectModalLabel').textContent = project.title;
  document.getElementById('projectModalBody').innerHTML = `
    <div class="d-flex align-items-center gap-3 mb-3">
      ${statusBadge}
      <span class="text-muted small">${project.sector}</span>
    </div>

    <p class="modal-section-title">Analyse QQOQCCP</p>
    <div class="table-responsive">
      <table class="table table-sm qqoqccp-table">
        <tbody>${qqoqccpRows}</tbody>
      </table>
    </div>

    <p class="modal-section-title">Indicateurs de valeur (KPI)</p>
    <ul class="list-unstyled">${kpiItems}</ul>

    <p class="modal-section-title">Impact organisationnel</p>
    <p class="text-muted small">${project.impact}</p>

    <p class="modal-section-title">Potentiel de réutilisation</p>
    <p class="text-muted small">${project.reutilisation}</p>

    <p class="modal-section-title">Technologies utilisées</p>
    <div class="tech-tags">${techBadges}</div>

    ${externalBtn}
  `;

  const modal = new bootstrap.Modal(document.getElementById('projectModal'));
  modal.show();
}

/* ════════════════════════════════════════════════════════════
   INIT — RENDU + FILTRES
   ════════════════════════════════════════════════════════════ */
function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // Rendu initial
  grid.innerHTML = PROJECTS.map(renderProjectCard).join('');

  // Ré-observer les nouvelles cartes pour les animations
  if (window._portfolioObserver) {
    grid.querySelectorAll('[data-animate]').forEach(el => window._portfolioObserver.observe(el));
  }

  // Filtres
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Activer le bouton cliqué
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Afficher / masquer les cartes
      document.querySelectorAll('.project-item').forEach(item => {
        const show = filter === 'all' || item.dataset.status === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

// Exposer pour la modal
window.openProjectModal = openProjectModal;

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}
