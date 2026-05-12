"use strict";

const PLANTS = [
  {
    botanical: "Trachelospermum jasminoides", common: "star jasmine", family: "Apocynaceae", wiki: "Trachelospermum_jasminoides",
    chars: "Evergreen woody twining vine. Leaves opposite, simple, glossy dark green, ovate to lance-shaped (3–7 cm), entire margin, leathery. Stems exude milky white sap when broken. Pinwheel white fragrant flowers."
  },
  {
    botanical: "Chamaerops humilis", common: "Mediterranean fan palm", family: "Arecaceae", wiki: "Chamaerops_humilis",
    chars: "Multi-trunked clumping palm. Leaves palmate (fan-shaped), stiff segments radiating from a central point, gray-green to silvery. Petiole armed with sharp spines along edges. Slow growing."
  },
  {
    botanical: "Felicia amelloides", common: "blue daisy", family: "Asteraceae", wiki: "Felicia_amelloides",
    chars: "Small evergreen subshrub. Leaves opposite, simple, ovate to oblong, slightly rough, dark green. Sky-blue ray flowers with bright yellow disc, single on long stems."
  },
  {
    botanical: "Liriodendron tulipifera", common: "tulip tree", family: "Magnoliaceae", wiki: "Liriodendron_tulipifera",
    chars: "Large deciduous tree. Leaves alternate, simple, with a distinctive 4-lobed truncate (\"cut-off\") apex — looks like a cat face or tulip silhouette. Bright yellow fall color. Tulip-shaped greenish-yellow flowers with orange band."
  },
  {
    botanical: "Digitalis purpurea", common: "foxglove", family: "Plantaginaceae", wiki: "Digitalis_purpurea",
    chars: "Herbaceous biennial. Year 1: basal rosette of large soft fuzzy ovate-lanceolate leaves with deeply impressed veins. Year 2: tall (1–2 m) one-sided spike of pendulous tubular pink-purple flowers spotted inside. All parts toxic."
  },
  {
    botanical: "Leucospermum cordifolium", common: "pincushion", family: "Proteaceae", wiki: "Leucospermum_cordifolium",
    chars: "Evergreen shrub. Leaves alternate, simple, leathery, gray-green, oblong with a heart-shaped (cordate) base and 3–9 small teeth at the tip. Domed flower heads with long protruding styles like pins in a cushion (orange/red/yellow)."
  },
  {
    botanical: "Eriobotrya deflexa", common: "bronze loquat", family: "Rosaceae", wiki: "Eriobotrya_deflexa",
    chars: "Evergreen tree. Leaves alternate, simple, large (10–20 cm), leathery, with prominent pinnate venation. New growth bright bronze/coppery-red. Margins less coarsely toothed than E. japonica; underside not as woolly."
  },
  {
    botanical: "Eriobotrya japonica", common: "loquat", family: "Rosaceae", wiki: "Eriobotrya_japonica",
    chars: "Evergreen tree. Leaves alternate, simple, very large (15–25 cm), thick and leathery, deeply impressed pinnate veins (corrugated look), coarsely toothed margins, woolly rust-colored underside. Edible orange fruit."
  },
  {
    botanical: "Prunus cerasifera 'Atropurpurea'", common: "red-leaf flowering plum", family: "Rosaceae", wiki: "Prunus_cerasifera",
    chars: "Small deciduous tree. Leaves alternate, simple, ovate to elliptic with finely serrated margins, deep purple/burgundy throughout the season. Pale pink flowers in early spring before/with leaves. Small dark plums."
  },
  {
    botanical: "Brugmansia sp. or cv.", common: "angel's trumpet", family: "Solanaceae", wiki: "Brugmansia",
    chars: "Large shrub or small tree. Leaves alternate, simple, large (15–30 cm), ovate, soft, slightly fuzzy, often with uneven base. Huge pendulous trumpet-shaped fragrant flowers (white, peach, yellow, pink). All parts toxic."
  },
  {
    botanical: "Acorus gramineus", common: "sweet flag", family: "Acoraceae", wiki: "Acorus_gramineus",
    chars: "Grass-like rhizomatous perennial. Narrow strap-like leaves in flat fans, parallel venation, often variegated cream/yellow. Sweet/spicy fragrance when crushed. Inconspicuous spadix flower."
  },
  {
    botanical: "Arbutus menziesii", common: "Pacific madrone", family: "Ericaceae", wiki: "Arbutus_menziesii",
    chars: "Evergreen tree. Leaves alternate, simple, leathery, oval, dark glossy green above, whitish-green below, entire (sometimes finely toothed). Iconic smooth peeling cinnamon-red to orange bark exposing pale new bark. Urn-shaped white flowers, red-orange berries."
  },
  {
    botanical: "Arctostaphylos densiflora", common: "Vine Hill manzanita", family: "Ericaceae", wiki: "Arctostaphylos_densiflora",
    chars: "Evergreen shrub. Leaves alternate, simple, small (1–3 cm), bright green, oval to elliptic, leathery, entire. Smooth mahogany-red bark, often peeling. Pendulous urn-shaped pink-white flowers in winter/early spring."
  },
  {
    botanical: "Vaccinium ovatum", common: "evergreen huckleberry", family: "Ericaceae", wiki: "Vaccinium_ovatum",
    chars: "Evergreen shrub. Leaves alternate, simple, small (1–3 cm), ovate, leathery, glossy dark green, with finely serrated margins. New growth bronze-pink. Small urn-shaped white-pink flowers; edible blue-black berries."
  },
  {
    botanical: "Lupinus arboreus", common: "bush lupine", family: "Fabaceae", wiki: "Lupinus_arboreus",
    chars: "Evergreen shrub. Leaves alternate, palmately compound with 5–12 narrow leaflets radiating from a single point, silvery hairs underneath. Yellow (sometimes blue/lavender) pea-flowers in upright racemes."
  },
  {
    botanical: "Wisteria floribunda", common: "Japanese wisteria", family: "Fabaceae", wiki: "Wisteria_floribunda",
    chars: "Deciduous twining woody vine — twines clockwise (vs. W. sinensis counter-clockwise). Leaves alternate, pinnately compound with 13–19 leaflets. Very long pendulous racemes of fragrant lilac-purple pea flowers (30–90 cm), opening sequentially."
  },
  {
    botanical: "Romneya coulteri", common: "matilija poppy", family: "Papaveraceae", wiki: "Romneya_coulteri",
    chars: "Tall (2 m+) suckering perennial. Leaves alternate, deeply pinnately lobed, blue-gray/glaucous. Huge (10–15 cm) white crepe-paper flowers with bright yellow stamen mass — the classic \"fried egg\" flower."
  },
  {
    botanical: "Leymus condensatus 'Canyon Prince'", common: "Canyon Prince wild rye", family: "Poaceae", wiki: "Leymus_condensatus",
    chars: "Cool-season ornamental grass. Stiff upright clumps of broad strap-like leaves, intense powder-blue/silver. Tall narrow wheat-like flower spikes. Spreads slowly by rhizomes."
  },
  {
    botanical: "Eschscholzia californica", common: "California poppy", family: "Papaveraceae", wiki: "Eschscholzia_californica",
    chars: "Annual/short-lived perennial. Leaves alternate, finely dissected/feathery, blue-green, with a waxy coating. Solitary cup-shaped 4-petaled silky flowers, vivid orange (also yellow/cream). Distinctive pointed conical bud cap. Long thin seed pods."
  },
  {
    botanical: "Juncus patens", common: "California grey rush", family: "Juncaceae", wiki: "Juncus_patens",
    chars: "Evergreen rush. Dense erect tufts of stiff, round, gray-green stems (the photosynthetic part — true leaves are reduced). Stems pithy, not hollow. Small brown flower clusters appear partway up the stem."
  },
  {
    botanical: "Carpenteria californica", common: "bush anemone", family: "Hydrangeaceae", wiki: "Carpenteria_californica",
    chars: "Evergreen shrub. Leaves opposite, simple, narrow lance-shaped, dark green above and pale/whitish below, entire margins, somewhat leathery. Large white anemone-like flowers with bright yellow stamens, fragrant."
  },
  {
    botanical: "Erigeron karvinskianus", common: "Santa Barbara daisy", family: "Asteraceae", wiki: "Erigeron_karvinskianus",
    chars: "Low spreading evergreen perennial. Leaves alternate, small, narrow, often with a few coarse teeth or shallow lobes near the tip. Many small daisy flowers that open white and age to pink/rose, all summer."
  },
  {
    botanical: "Arctotheca calendula", common: "cape weed", family: "Asteraceae", wiki: "Arctotheca_calendula",
    chars: "Low spreading perennial/annual. Leaves in basal rosette, deeply pinnately lobed, dark green above with white-woolly underside. Yellow daisy flowers with dark center on long leafless stalks. Invasive in California."
  },
  {
    botanical: "Carex nudata", common: "naked sedge", family: "Cyperaceae", wiki: "Carex_nudata",
    chars: "Clumping evergreen sedge. Narrow grass-like dark green leaves in dense fountain-shaped tufts. Triangular stems (\"sedges have edges\"). Dark, contrasting flower spikes held above foliage in spring. Native streambanks."
  },
  {
    botanical: "Carex testacea", common: "orange sedge", family: "Cyperaceae", wiki: "Carex_testacea",
    chars: "Clumping evergreen sedge. Fine threadlike arching leaves, olive-green at base shading to coppery-orange at the tips, especially in sun. Triangular stems. Weeping mound habit."
  },
  {
    botanical: "Parrotia persica", common: "Persian ironwood", family: "Hamamelidaceae", wiki: "Parrotia_persica",
    chars: "Small deciduous tree. Leaves alternate, simple, ovate, with shallow wavy/scalloped teeth on upper half, somewhat asymmetric base. Brilliant red/orange/yellow fall color. Smooth mottled exfoliating bark in patches of gray, green, and tan."
  },
  {
    botanical: "Malus floribunda", common: "flowering crab apple", family: "Rosaceae", wiki: "Malus_floribunda",
    chars: "Small deciduous tree. Leaves alternate, simple, ovate, with finely serrated margins. Profuse pink buds opening to white flowers. Tiny yellow-red fruit persist into winter."
  },
  {
    botanical: "Chiranthodendron pentadactylon", common: "monkey hand tree", family: "Malvaceae", wiki: "Chiranthodendron_pentadactylon",
    chars: "Evergreen tree. Leaves alternate, simple, very large, palmately lobed (5 lobes), dark green above with pale tan tomentose underside. Distinctive red flowers shaped like a 5-fingered claw or hand."
  },
  {
    botanical: "Daphne odora", common: "winter Daphne", family: "Thymelaeaceae", wiki: "Daphne_odora",
    chars: "Compact evergreen shrub. Leaves alternate, simple, oblanceolate (widest above middle), glossy dark green, leathery, often edged in cream ('Marginata'). Intensely fragrant pink-and-white flower clusters at branch tips in late winter. All parts toxic."
  },
  {
    botanical: "Eucalyptus nicholii", common: "Nichol's willowleaf peppermint", family: "Myrtaceae", wiki: "Eucalyptus_nicholii",
    chars: "Evergreen tree. Adult leaves alternate, very narrow, lance-shaped/willow-like, blue-green, drooping. Strong peppermint smell when crushed. Fibrous brown bark. Small white flowers in clusters."
  },
  {
    botanical: "Eucalyptus globulus", common: "blue gum", family: "Myrtaceae", wiki: "Eucalyptus_globulus",
    chars: "Tall evergreen tree. Striking dimorphic leaves: juvenile opposite, sessile, heart-shaped/ovate, glaucous blue-white; adult alternate, lance-sickle-shaped, dark green. Smooth bark sheds in long ribbons. Large warty single bud caps. Strong eucalypt scent."
  },
  {
    botanical: "Eucalyptus lehmannii", common: "Lehmann's gum / bushy yate", family: "Myrtaceae", wiki: "Eucalyptus_lehmannii",
    chars: "Small evergreen tree, dense rounded crown. Leaves alternate, narrow-ovate to lanceolate, dull green. Distinctive: bud caps very long, slender, horn-like, fused into clusters of 7–11 (\"bunch of bananas\" look). Yellow-green bottlebrush flowers."
  },
  {
    botanical: "Metrosideros excelsa", common: "New Zealand Christmas tree", family: "Myrtaceae", wiki: "Metrosideros_excelsa",
    chars: "Evergreen tree. Leaves opposite, simple, ovate, leathery, dark green above with dense white-felted underside. Bright crimson bottlebrush flowers (mostly stamens) in summer. Aerial roots common."
  },
  {
    botanical: "Lavandula stoechas", common: "Spanish lavender", family: "Lamiaceae", wiki: "Lavandula_stoechas",
    chars: "Small evergreen shrub. Leaves opposite, narrow linear, gray-green, fragrant. Square stems (Lamiaceae). Compact dark purple flower spike topped by showy purple sterile bracts (\"rabbit ears\") — distinguishes from English lavender."
  },
  {
    botanical: "Helianthemum nummularium", common: "sun rose", family: "Cistaceae", wiki: "Helianthemum_nummularium",
    chars: "Low evergreen subshrub. Leaves opposite, simple, small oval, gray-green often with white-hairy underside. Many small (2 cm) 5-petaled crepe-papery flowers — yellow, orange, pink, red — each lasting one day."
  },
  {
    botanical: "Abelia x grandiflora", common: "glossy Abelia", family: "Caprifoliaceae", wiki: "Abelia_%C3%97_grandiflora",
    chars: "Semi-evergreen shrub with arching branches. Leaves opposite (sometimes whorled in 3s), simple, glossy ovate, often bronzy in cool weather. Small fragrant white-to-pink tubular flowers all summer; reddish persistent sepals after petals drop."
  },
  {
    botanical: "Jasminum polyanthum", common: "pink jasmine", family: "Oleaceae", wiki: "Jasminum_polyanthum",
    chars: "Vigorous evergreen twining vine. Leaves opposite, pinnately compound with 5–7 lance-shaped leaflets (terminal one largest). Pink buds opening to white star-shaped tubular flowers in dense clusters — strongly fragrant in late winter/early spring."
  },
  {
    botanical: "Heuchera sp. or hybrid", common: "Heuchera", family: "Saxifragaceae", wiki: "Heuchera",
    chars: "Evergreen perennial. Basal mound of long-petioled, palmately lobed/scalloped rounded leaves, often boldly colored (purple, lime, peach, silver-marbled). Tall slender airy panicles of small bell-shaped flowers."
  },
  {
    botanical: "Rosa banksiae", common: "Lady Banks rose", family: "Rosaceae", wiki: "Rosa_banksiae",
    chars: "Vigorous evergreen climbing rose — essentially thornless (rare in roses). Leaves alternate, pinnately compound, usually 3–5 narrow lance-shaped leaflets, glossy. Massive spring display of small pale yellow or white flowers in clusters."
  },
  {
    botanical: "Pleroma urvilleanum", common: "princess flower", family: "Melastomataceae", wiki: "Pleroma_urvilleanum",
    chars: "Evergreen shrub. Leaves opposite, simple, ovate, velvety hairy, with 3–5 prominent parallel veins running from base to tip (Melastome trait). New growth often orange-red. Large vivid royal-purple 5-petaled flowers."
  },
  {
    botanical: "Diplacus aurantiacus", common: "sticky monkey flower", family: "Phrymaceae", wiki: "Diplacus_aurantiacus",
    chars: "Subshrub native to California. Leaves opposite, simple, narrow lance-shaped, dark glossy green, sticky/resinous to the touch with rolled-under (revolute) margins. Tubular two-lipped flowers in orange/apricot/yellow."
  },
  {
    botanical: "Grevillea 'White Wings'", common: "White Wings Grevillea", family: "Proteaceae", wiki: "Grevillea",
    chars: "Evergreen shrub. Leaves alternate, finely divided into needle-like segments (looks ferny or pine-like), gray-green, older growth prickly. Spider-like, wispy white flower clusters with long curved styles, year-round. Very low water."
  },
  {
    botanical: "Phlomis fruticosa", common: "Jerusalem sage", family: "Lamiaceae", wiki: "Phlomis_fruticosa",
    chars: "Evergreen subshrub. Leaves opposite, simple, ovate-oblong, sage-like, gray-green, densely woolly/felted on both sides (especially below). Square stems (Lamiaceae). Whorled clusters (verticillasters) of hooded yellow flowers around the stem."
  },
  {
    botanical: "Cistus ladanifer", common: "crimson-spot rockrose", family: "Cistaceae", wiki: "Cistus_ladanifer",
    chars: "Evergreen shrub. Leaves opposite, simple, narrow lance-shaped, dark green above, sticky and intensely aromatic (labdanum resin) — leaves often look glossy/varnished. Large white 5-petaled flowers each with a dark crimson blotch at the base."
  },
  {
    botanical: "Weigela florida", common: "pink Weigela", family: "Caprifoliaceae", wiki: "Weigela_florida",
    chars: "Deciduous shrub with arching branches. Leaves opposite, simple, ovate-elliptic with serrated margins. Funnel-shaped pink to rosy-red 5-lobed flowers in late spring along last year's stems."
  },
  {
    botanical: "Ceanothus gloriosus", common: "Pt. Reyes ceanothus", family: "Rhamnaceae", wiki: "Ceanothus_gloriosus",
    chars: "Low/prostrate evergreen shrub. Leaves opposite, simple, small, leathery, broadly elliptic to round, with sharp holly-like spiny teeth on the margins. Small powder-blue to deep blue flower clusters in spring."
  },
  {
    botanical: "Ceanothus 'Concha'", common: "Concha ceanothus", family: "Rhamnaceae", wiki: "Ceanothus",
    chars: "Evergreen shrub. Leaves alternate, simple, small (2–3 cm), narrow, dark glossy green, with 3 prominent veins running from base. Reddish buds opening to abundant deep cobalt-blue flower clusters in spring."
  },
  {
    botanical: "Magnolia campbellii", common: "Campbell's magnolia", family: "Magnoliaceae", wiki: "Magnolia_campbellii",
    chars: "Large deciduous tree. Leaves alternate, simple, large, elliptic, entire margin. Very large cup-and-saucer pink flowers (15–25 cm) on bare branches in late winter — long before leaves. Smooth gray bark."
  },
  {
    botanical: "Magnolia x soulangeana", common: "saucer magnolia", family: "Magnoliaceae", wiki: "Magnolia_%C3%97_soulangeana",
    chars: "Small deciduous tree, often multi-trunked. Leaves alternate, simple, broad ovate-obovate (widest above middle), entire. Large goblet/tulip-shaped flowers in early spring before leaves — typically pink-purple outside, white inside."
  },
  {
    botanical: "Hakonechloa macra 'Aureola'", common: "golden Japanese forest grass", family: "Poaceae", wiki: "Hakonechloa_macra",
    chars: "Slow-spreading deciduous grass. Soft, narrow, gracefully arching leaves all sweeping in one direction — like a small flowing waterfall. 'Aureola' has bright gold leaves with thin green stripes; flushes pink-red in fall."
  },
  {
    botanical: "Hypericum x moserianum", common: "gold flower", family: "Hypericaceae", wiki: "Hypericum",
    chars: "Low semi-evergreen shrub. Leaves opposite, simple, ovate, blue-green, with translucent dots when held to light (oil glands). Large bright yellow 5-petaled flowers with a prominent boss of many stamens."
  },
  {
    botanical: "Banksia sp.", common: "Banksia", family: "Proteaceae", wiki: "Banksia",
    chars: "Evergreen shrub or tree. Leaves alternate, simple, leathery, often very stiff with sharply serrated/saw-toothed margins (varies by species). Iconic dense cylindrical or globular flower spikes (yellow/orange/red); woody seed cones persist."
  },
  {
    botanical: "Protea cynaroides", common: "king Protea", family: "Proteaceae", wiki: "Protea_cynaroides",
    chars: "Evergreen shrub. Leaves alternate, simple, large, leathery, broadly elliptic with rounded or spoon-shaped tips and distinctive long red petioles, entire margins. Enormous (20–30 cm) artichoke-like flower head with pink involucral bracts."
  },
  {
    botanical: "Anigozanthos hybrid", common: "kangaroo paw", family: "Haemodoraceae", wiki: "Anigozanthos",
    chars: "Clumping evergreen perennial from rhizomes. Basal sword-shaped strap leaves in fans. Tubular flowers densely covered in colored hairs (red, yellow, green, orange, pink), arranged like a kangaroo's paw on tall branched stalks."
  },
  {
    botanical: "Leucadendron argenteum", common: "silver tree", family: "Proteaceae", wiki: "Leucadendron_argenteum",
    chars: "Evergreen tree. Leaves alternate, simple, lance-shaped, densely covered in silvery silky hairs on both sides — unmistakable shimmering silver foliage that flashes in wind. Cone-like flower heads. Endemic to Cape Town."
  },
  {
    botanical: "Chaenomeles hybrid", common: "flowering quince", family: "Rosaceae", wiki: "Chaenomeles",
    chars: "Deciduous shrub with stiff thorny tangled stems. Leaves alternate, simple, glossy ovate with finely serrated margins, often bronzy when new. Showy 5-petaled cup-shaped flowers (red/orange/pink/white) on bare stems in late winter, before leaves. Hard yellow-green fruits."
  },
  {
    botanical: "Ceratonia siliqua", common: "carob", family: "Fabaceae", wiki: "Ceratonia_siliqua",
    chars: "Evergreen tree. Leaves alternate, even-pinnately compound (no terminal leaflet) with 6–10 thick leathery rounded dark glossy green leaflets. Small flowers directly on old wood (cauliflorous). Large flat brown leathery seed pods."
  },
  {
    botanical: "Acacia stenophylla", common: "shoelace acacia", family: "Fabaceae", wiki: "Acacia_stenophylla",
    chars: "Evergreen tree with weeping habit. \"Leaves\" are actually phyllodes (flattened petioles): extremely long, very narrow (3–40 cm long, ~1 cm wide), pendulous — look like green shoelaces hanging down. Pale yellow puffball flowers, long bead-like pods."
  },
  {
    botanical: "Pelargonium x hortorum", common: "common geranium", family: "Geraniaceae", wiki: "Pelargonium_%C3%97_hortorum",
    chars: "Tender perennial/subshrub. Leaves alternate, rounded-reniform with scalloped/crenate margins, often with a darker horseshoe-shaped \"zone\" marking. Pungent scent when brushed. Showy ball-shaped clusters (umbels) of red/pink/white/coral flowers."
  }
];
