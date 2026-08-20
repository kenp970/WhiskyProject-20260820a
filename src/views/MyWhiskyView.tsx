import React, { useState } from 'react';
import { Whisky } from '../types';
import { WHISKIES } from '../data/whiskies';
import { Heart, BookOpen, Star, Plus, Trash2, Wine, Calendar, Edit3, Check, X, ArrowRight, Sparkles, Filter, Bookmark, CheckCircle2 } from 'lucide-react';

export type WhiskyStatus = 'favourite' | 'want_to_try' | 'tried';

export interface SavedWhiskyState {
  whiskyId: string;
  status: WhiskyStatus;
  userRating?: number; // 1 to 5
}

export interface TastingEntry {
  id: string;
  whiskyId: string;
  whiskyName: string;
  distilleryName: string;
  rating: number;
  date: string;
  noseNotes: string;
  palateNotes: string;
  finishNotes: string;
  waterAdded: boolean;
  overallImpression: string;
}

interface Props {
  savedWhiskies: Whisky[];
  onRemoveFromSaved: (id: string) => void;
  onSelectWhisky: (whisky: Whisky) => void;
  tastingJournal: TastingEntry[];
  onAddJournalEntry: (entry: TastingEntry) => void;
  onDeleteJournalEntry: (id: string) => void;
}

export const MyWhiskyView: React.FC<Props> = ({
  savedWhiskies,
  onRemoveFromSaved,
  onSelectWhisky,
  tastingJournal,
  onAddJournalEntry,
  onDeleteJournalEntry,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'cabinet' | 'journal'>('cabinet');
  const [statusFilter, setStatusFilter] = useState<'all' | 'favourite' | 'want_to_try' | 'tried'>('all');
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  // Status mapping stored in localStorage
  const [whiskyStatuses, setWhiskyStatuses] = useState<Record<string, WhiskyStatus>>(() => {
    try {
      const saved = localStorage.getItem('scotland_whisky_statuses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Personal ratings stored in localStorage
  const [whiskyRatings, setWhiskyRatings] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('scotland_whisky_ratings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist statuses and ratings
  const updateStatus = (whiskyId: string, status: WhiskyStatus) => {
    const next = { ...whiskyStatuses, [whiskyId]: status };
    setWhiskyStatuses(next);
    try {
      localStorage.setItem('scotland_whisky_statuses', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const updateRating = (whiskyId: string, rating: number) => {
    const next = { ...whiskyRatings, [whiskyId]: rating };
    setWhiskyRatings(next);
    try {
      localStorage.setItem('scotland_whisky_ratings', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  // Form State for New Tasting Log
  const [formWhiskyId, setFormWhiskyId] = useState(WHISKIES[0]?.id || '');
  const [formRating, setFormRating] = useState(5);
  const [formNose, setFormNose] = useState('');
  const [formPalate, setFormPalate] = useState('');
  const [formFinish, setFormFinish] = useState('');
  const [formWaterAdded, setFormWaterAdded] = useState(false);
  const [formImpression, setFormImpression] = useState('');

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const targetWhisky = WHISKIES.find(w => w.id === formWhiskyId) || WHISKIES[0];
    const newEntry: TastingEntry = {
      id: Date.now().toString(),
      whiskyId: targetWhisky.id,
      whiskyName: targetWhisky.name,
      distilleryName: targetWhisky.distilleryName,
      rating: formRating,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      noseNotes: formNose || targetWhisky.tastingNotes.nose,
      palateNotes: formPalate || targetWhisky.tastingNotes.palate,
      finishNotes: formFinish || targetWhisky.tastingNotes.finish,
      waterAdded: formWaterAdded,
      overallImpression: formImpression || 'Delightful expression with superb balance.',
    };

    onAddJournalEntry(newEntry);
    updateStatus(targetWhisky.id, 'tried');
    updateRating(targetWhisky.id, formRating);

    setIsAddingEntry(false);
    setFormNose('');
    setFormPalate('');
    setFormFinish('');
    setFormImpression('');
    setActiveMainTab('journal');
  };

  // Filtered whiskies based on status
  const displayedWhiskies = savedWhiskies.filter(w => {
    if (statusFilter === 'all') return true;
    const currentStatus = whiskyStatuses[w.id] || 'favourite'; // default to favourite if saved
    return currentStatus === statusFilter;
  });

  const favouriteCount = savedWhiskies.filter(w => (whiskyStatuses[w.id] || 'favourite') === 'favourite').length;
  const wantToTryCount = savedWhiskies.filter(w => whiskyStatuses[w.id] === 'want_to_try').length;
  const triedCount = savedWhiskies.filter(w => whiskyStatuses[w.id] === 'tried').length;

  return (
    <div className="space-y-12 animate-apple-fade pb-20">
      {/* Header Banner */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <Heart className="w-3.5 h-3.5" />
          <span>Personal Cellar & Tasting Notes</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          My Whisky.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          Manage your personal cellar of Scottish single malts: organize <strong className="text-[#1d1d1f] font-medium">Favourites</strong>, <strong className="text-[#1d1d1f] font-medium">Want to Try</strong>, and <strong className="text-[#1d1d1f] font-medium">Tried</strong>, rate bottles, and record your private tasting notes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Tab Switcher: Cabinet vs Journal */}
        <div className="flex items-center justify-between pb-4 flex-wrap gap-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2 bg-[#f5f5f7] p-1.5 rounded-full border border-black/[0.04]">
            <button
              onClick={() => setActiveMainTab('cabinet')}
              className={`px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeMainTab === 'cabinet'
                  ? 'bg-white text-[#1d1d1f] shadow-xs'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Whisky Cabinet ({savedWhiskies.length})</span>
            </button>

            <button
              onClick={() => setActiveMainTab('journal')}
              className={`px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeMainTab === 'journal'
                  ? 'bg-white text-[#1d1d1f] shadow-xs'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Tasting Journal ({tastingJournal.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddingEntry(true)}
            className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Tasting Note</span>
          </button>
        </div>

        {/* Modal: New Tasting Note Form */}
        {isAddingEntry && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-3xl border border-black/[0.08] shadow-2xl p-6 sm:p-10 space-y-6 animate-apple-fade my-auto">
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <Wine className="w-5 h-5 text-[#0071e3]" />
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                    Log Tasting Journal Entry
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddingEntry(false)}
                  className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEntry} className="space-y-5">
                {/* Select Whisky */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Select Single Malt
                  </label>
                  <select
                    value={formWhiskyId}
                    onChange={(e) => setFormWhiskyId(e.target.value)}
                    className="w-full p-3 bg-[#f5f5f7] border border-black/[0.06] text-xs text-[#1d1d1f] font-medium rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071e3] cursor-pointer"
                  >
                    {WHISKIES.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.regionName} • {w.ageStatement})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Your Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formRating
                              ? 'fill-[#0071e3] text-[#0071e3]'
                              : 'text-black/15'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-semibold text-[#1d1d1f]">{formRating} / 5 Stars</span>
                  </div>
                </div>

                {/* Sensory Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1d1d1f] block">
                      1. Nose Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formNose}
                      onChange={(e) => setFormNose(e.target.value)}
                      placeholder="e.g. Vanilla, honeyed malt, orange zest..."
                      className="w-full p-3 bg-[#f5f5f7] border border-black/[0.06] text-xs text-[#1d1d1f] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1d1d1f] block">
                      2. Palate Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formPalate}
                      onChange={(e) => setFormPalate(e.target.value)}
                      placeholder="e.g. Raisins, baking spice, creamy toffee..."
                      className="w-full p-3 bg-[#f5f5f7] border border-black/[0.06] text-xs text-[#1d1d1f] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1d1d1f] block">
                      3. Finish Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formFinish}
                      onChange={(e) => setFormFinish(e.target.value)}
                      placeholder="e.g. Lingering oak, delicate smoke..."
                      className="w-full p-3 bg-[#f5f5f7] border border-black/[0.06] text-xs text-[#1d1d1f] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    />
                  </div>
                </div>

                {/* Overall Impression */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Overall Impression & Tasting Summary
                  </label>
                  <input
                    type="text"
                    value={formImpression}
                    onChange={(e) => setFormImpression(e.target.value)}
                    placeholder="e.g. Exceptional sherried dram, pairs wonderfully with dark chocolate."
                    className="w-full p-3 bg-[#f5f5f7] border border-black/[0.06] text-xs text-[#1d1d1f] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>

                {/* Water Added Toggle */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="waterCheck"
                    checked={formWaterAdded}
                    onChange={(e) => setFormWaterAdded(e.target.checked)}
                    className="w-4 h-4 accent-[#0071e3] rounded cursor-pointer"
                  />
                  <label htmlFor="waterCheck" className="text-xs text-[#1d1d1f] font-medium cursor-pointer">
                    Water or spring water drops added during tasting
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.06]">
                  <button
                    type="button"
                    onClick={() => setIsAddingEntry(false)}
                    className="px-5 py-2.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold rounded-full cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full cursor-pointer transition-colors shadow-xs"
                  >
                    Save to Journal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content 1: Whisky Cabinet */}
        {activeMainTab === 'cabinet' && (
          <div className="space-y-6 animate-apple-fade">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f5f5f7] p-2.5 rounded-2xl border border-black/[0.04]">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868b] mr-1 ml-2">
                  Category:
                </span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-white text-[#1d1d1f] shadow-2xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  All Saved ({savedWhiskies.length})
                </button>
                <button
                  onClick={() => setStatusFilter('favourite')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === 'favourite'
                      ? 'bg-white text-[#ff3b30] shadow-2xs'
                      : 'text-[#86868b] hover:text-[#ff3b30]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Favourites ({favouriteCount})</span>
                </button>
                <button
                  onClick={() => setStatusFilter('want_to_try')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === 'want_to_try'
                      ? 'bg-white text-[#ff9500] shadow-2xs'
                      : 'text-[#86868b] hover:text-[#ff9500]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>Want to Try ({wantToTryCount})</span>
                </button>
                <button
                  onClick={() => setStatusFilter('tried')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === 'tried'
                      ? 'bg-white text-[#34c759] shadow-2xs'
                      : 'text-[#86868b] hover:text-[#34c759]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34c759]" />
                  <span>Tried ({triedCount})</span>
                </button>
              </div>

              <span className="text-xs text-[#86868b] pr-2">
                Showing {displayedWhiskies.length} bottles
              </span>
            </div>

            {displayedWhiskies.length === 0 ? (
              <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-12 sm:p-16 text-center space-y-4 shadow-xs">
                <Heart className="w-10 h-10 text-[#86868b] mx-auto opacity-40" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  No whiskies saved in this category yet
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] max-w-md mx-auto">
                  Browse our collection in the Whisky Explorer and click the heart icon on any bottle to save it to your personal cabinet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedWhiskies.map((whisky) => {
                  const currentStatus = whiskyStatuses[whisky.id] || 'favourite';
                  const userRating = whiskyRatings[whisky.id] || 5;

                  return (
                    <div
                      key={whisky.id}
                      className="bg-white rounded-3xl border border-black/[0.06] apple-card-hover p-6 shadow-2xs flex flex-col justify-between group relative"
                    >
                      {/* Top Status & Remove */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        {/* Status Switcher Badge */}
                        <div className="flex items-center gap-1 bg-[#f5f5f7] p-1 rounded-full border border-black/[0.04]">
                          <button
                            onClick={() => updateStatus(whisky.id, 'favourite')}
                            title="Set as Favourite"
                            className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full transition-colors cursor-pointer ${
                              currentStatus === 'favourite'
                                ? 'bg-white text-[#ff3b30] shadow-2xs'
                                : 'text-[#86868b] hover:text-[#ff3b30]'
                            }`}
                          >
                            ❤️ Fav
                          </button>
                          <button
                            onClick={() => updateStatus(whisky.id, 'want_to_try')}
                            title="Set as Want to Try"
                            className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full transition-colors cursor-pointer ${
                              currentStatus === 'want_to_try'
                                ? 'bg-white text-[#ff9500] shadow-2xs'
                                : 'text-[#86868b] hover:text-[#ff9500]'
                            }`}
                          >
                            🎯 Want
                          </button>
                          <button
                            onClick={() => updateStatus(whisky.id, 'tried')}
                            title="Set as Tried"
                            className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full transition-colors cursor-pointer ${
                              currentStatus === 'tried'
                                ? 'bg-white text-[#34c759] shadow-2xs'
                                : 'text-[#86868b] hover:text-[#34c759]'
                            }`}
                          >
                            ✓ Tried
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveFromSaved(whisky.id)}
                          title="Remove from cabinet"
                          className="w-7 h-7 rounded-full bg-[#f5f5f7] hover:bg-[#ff3b30]/10 hover:text-[#ff3b30] text-[#86868b] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bottle Image */}
                      <div
                        onClick={() => onSelectWhisky(whisky)}
                        className="w-full h-44 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] p-3 flex items-center justify-center cursor-pointer group-hover:bg-[#f0f0f2] transition-colors mb-4"
                      >
                        <img
                          src={whisky.bottleImage}
                          alt={whisky.name}
                          className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="space-y-2 flex-1">
                        <span className="text-xs font-semibold text-[#0071e3] block truncate">
                          {whisky.regionName} • {whisky.distilleryName}
                        </span>
                        <h4
                          onClick={() => onSelectWhisky(whisky)}
                          className="text-base font-bold text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors leading-tight"
                        >
                          {whisky.name}
                        </h4>
                        <div className="flex gap-1.5 text-xs">
                          <span className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] font-medium rounded-full">
                            {whisky.ageStatement}
                          </span>
                          <span className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] font-medium rounded-full">
                            {whisky.abv}%
                          </span>
                          <span className="px-2 py-0.5 bg-[#1d1d1f] text-white font-medium rounded-full">
                            {whisky.peatLevel}
                          </span>
                        </div>

                        {/* Star Rating Selector */}
                        <div className="flex items-center gap-1.5 pt-2">
                          <span className="text-[11px] font-semibold text-[#86868b] mr-1">
                            My Rating:
                          </span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => updateRating(whisky.id, star)}
                              className="cursor-pointer transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= userRating
                                    ? 'fill-[#0071e3] text-[#0071e3]'
                                    : 'text-black/15'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Explore Button */}
                      <div className="pt-4 mt-3 border-t border-black/[0.06]">
                        <button
                          onClick={() => onSelectWhisky(whisky)}
                          className="w-full px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>View Full Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Tasting Journal Logbook */}
        {activeMainTab === 'journal' && (
          <div className="space-y-6 animate-apple-fade">
            {tastingJournal.length === 0 ? (
              <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-12 sm:p-16 text-center space-y-4 shadow-xs">
                <BookOpen className="w-10 h-10 text-[#86868b] mx-auto opacity-40" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  Your Tasting Journal is Empty
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] max-w-md mx-auto">
                  Click "Record New Tasting Note" to capture your sensory impressions, nose notes, and star ratings.
                </p>
                <button
                  onClick={() => setIsAddingEntry(true)}
                  className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full cursor-pointer shadow-xs"
                >
                  Add First Tasting Note
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {tastingJournal.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-4 apple-card-hover"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-black/[0.06] pb-4">
                      <div>
                        <span className="text-xs font-semibold text-[#0071e3]">
                          {entry.distilleryName}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f]">
                          {entry.whiskyName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= entry.rating
                                  ? 'fill-[#0071e3] text-[#0071e3]'
                                  : 'text-black/15'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#86868b]">
                          {entry.date}
                        </span>
                        <button
                          onClick={() => onDeleteJournalEntry(entry.id)}
                          className="w-7 h-7 rounded-full bg-[#f5f5f7] hover:bg-[#ff3b30]/10 hover:text-[#ff3b30] text-[#86868b] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Tasting Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#f5f5f7] p-5 rounded-2xl border border-black/[0.04] text-xs">
                      <div>
                        <span className="font-bold text-[#0071e3] block text-xs mb-1">
                          Nose
                        </span>
                        <p className="text-[#1d1d1f] leading-relaxed">{entry.noseNotes}</p>
                      </div>
                      <div>
                        <span className="font-bold text-[#0071e3] block text-xs mb-1">
                          Palate
                        </span>
                        <p className="text-[#1d1d1f] leading-relaxed">{entry.palateNotes}</p>
                      </div>
                      <div>
                        <span className="font-bold text-[#0071e3] block text-xs mb-1">
                          Finish
                        </span>
                        <p className="text-[#1d1d1f] leading-relaxed">{entry.finishNotes}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                      <p className="italic text-[#1d1d1f]">
                        "{entry.overallImpression}"
                      </p>
                      {entry.waterAdded && (
                        <span className="px-3 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-semibold rounded-full">
                          💧 Spring Water Added
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
